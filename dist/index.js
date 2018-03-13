import { Subject } from "rxjs/Subject";
import { Message } from "../pb/rpc_pb";
import { Observable } from "rxjs/Observable";
export class PbRPC {
    Init(url) {
        console.log("Init WebSocket connection");
        this.url = url;
        this.checkInterval = 1500;
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = "arraybuffer";
        this.ws.onopen = () => {
            console.log("WebSocket open");
            // Setup check function
            setInterval(() => {
                if (this.ws.readyState !== WebSocket.OPEN) {
                    this.Init(this.url);
                }
            }, this.checkInterval);
            // Create observable for subject
            const observable = Observable.create((obs) => {
                this.ws.onmessage = obs.next.bind(obs);
                this.ws.onerror = obs.error.bind(obs);
                this.ws.onclose = obs.complete.bind(obs);
                return this.ws.close.bind(this.ws);
            });
            // Create observer for subject
            const observer = {
                next: (request) => {
                    if (this.ws === undefined || this.ws.readyState !== WebSocket.OPEN) {
                        console.log("WebSocket is closed.");
                        this.Init(this.url);
                    }
                    else {
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
    createWsSubject(observer, observable) {
        this.wsSubject = Subject.create(observer, observable);
        this.wsSubject.asObservable().subscribe((msg) => {
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
            }
            else {
                console.log("Got message with unknown id", response);
            }
        });
    }
    Call(method, arg) {
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
    KillStream(id) {
        const message = new Message();
        message.setId(id);
        this.wsSubject.next(message);
    }
}
//# sourceMappingURL=index.js.map