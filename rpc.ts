import {Subject} from "rxjs/Subject";
import {Observer} from "rxjs/Observer";
import {Message} from "./rpc_pb";
import {Observable} from "rxjs/Observable";

export class PbRpc {
    public url: string;
    public ws: WebSocket;
    public wsConnStateObservable: Observable<boolean>;
    private wsConnStateObserver: Observer<any>;
    public ows: Subject<any>;
    public stack: Map<number, Observer<any>>;

    Init(url: string) {
        this.url = url;
        this.wsConnStateObservable = new Observable(connObserver => {
            this.wsConnStateObserver = connObserver;
            console.log("Init WebSocket connection");
            this.ws = new WebSocket(this.url);
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = () => {
                this.wsConnStateObserver.next(true);
                console.log("WebSocket open");
                const observable = Observable.create((obs: Observer<MessageEvent>) => {
                    this.ws.onmessage = obs.next.bind(obs);
                    this.ws.onerror = obs.error.bind(obs);
                    this.ws.onclose = obs.complete.bind(obs);
                    return this.ws.close.bind(this.ws);
                });
                const observer = {
                    next: (request: Message) => {
                        if (this.ws !== undefined && this.ws.readyState !== WebSocket.OPEN) {
                            console.log("WebSocket is closed.");
                            this.wsConnStateObserver.next(false);
                            setTimeout(() => {
                                this.ows.next(request);
                            }, 500);
                        } else {
                            this.ws.send(request.serializeBinary());
                        }
                    },
                    error: (error) => {
                        this.wsConnStateObserver.next(false);
                        console.log(error, "WebSocket error");
                    },
                    complete: () => {
                        this.wsConnStateObserver.next(false);
                        console.log("WebSocket close");
                    }
                };
                if (this.stack === undefined || this.ows === undefined) {
                    this.createStack(observer, observable);
                }
            };
        });

    }

    private createStack(observer: Observer<any>, observable: Observable<any>) {
        this.stack = new Map();
        this.ows = <Subject<any>> Subject.create(observer, observable);
        this.ows.asObservable().subscribe((msg: MessageEvent) => {
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
            this.ows.next(message);
        });
    }
}

export interface Serial {
    serializeBinary(): Uint8Array;
}
