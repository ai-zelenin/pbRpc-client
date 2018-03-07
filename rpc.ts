import {Subject} from "rxjs/Subject";
import {Observer} from "rxjs/Observer";
import {Message} from "./rpc_pb";
import {Observable} from "rxjs/Observable";

export class PbRPC {
    public url: string;
    public ws: WebSocket;
    public wsSubject: Subject<any>;
    public stack: Map<number, Observer<any>>;
    public checkInterbval: number;

    public Init(url: string) {
        console.log("Init WebSocket connection");
        this.url = url;
        this.checkInterbval = 1500;
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = "arraybuffer";
        this.ws.onopen = () => {
            console.log("WebSocket open");
            // Setup check function
            setInterval(() => {
                if (this.ws.readyState !== WebSocket.OPEN) {
                    this.Init(this.url);
                }
            }, this.checkInterbval);
            // Create observable for subject
            const observable = Observable.create((obs: Observer<MessageEvent>) => {
                this.ws.onmessage = obs.next.bind(obs);
                this.ws.onerror = obs.error.bind(obs);
                this.ws.onclose = obs.complete.bind(obs);
                return this.ws.close.bind(this.ws);
            });
            // Create observer for subject
            const observer = {
                next: (request: Message) => {
                    if (this.ws === undefined || this.ws.readyState !== WebSocket.OPEN) {
                        console.log("WebSocket is closed.");
                        this.Init(this.url);
                    } else {
                        this.ws.send(request.serializeBinary());
                    }
                },
                error: (error) => {
                    console.log(error, "WebSocket error");
                    this.Init(this.url);
                },
                complete: () => {
                    console.log("WebSocket close");
                    this.Init(this.url);
                }
            };
            // Create procedure call stack
            if (this.stack === undefined) {
                this.stack = new Map();
            }
            // Create websocket subject
            this.createWsSubject(observer, observable);
        };
    }

    private createWsSubject(observer: Observer<any>, observable: Observable<any>) {
        this.wsSubject = <Subject<any>> Subject.create(observer, observable);
        this.wsSubject.asObservable().subscribe((msg: MessageEvent) => {
            // Deserialize incoming message
            const response = Message.deserializeBinary(new Uint8Array(msg.data));
            // Find id in map and roll observer
            const obs = this.stack.get(response.getId());
            if (obs !== undefined) {
                obs.next(response);
                if (!response.getInstream()) {
                    obs.complete();
                    this.stack.delete(response.getId());
                }
            } else {
                console.log("Got message with unknown id", response);
            }
        });
    }

    public Call(method: string, arg: Serial): Observable<any> {
        const message = new Message();
        message.setId(Math.floor(Math.random() * 10000000000));
        message.setMethod(method);
        message.setArg(arg.serializeBinary());
        return new Observable(observer => {
            // Create response observer
            this.stack.set(message.getId(), observer);
            this.wsSubject.next(message);
        });
    }
}

export interface Serial {
    serializeBinary(): Uint8Array;
}
