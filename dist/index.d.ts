import {Subject} from "rxjs/Subject";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";

export declare class PbRPC {
    url: string;
    ws: WebSocket;
    wsSubject: Subject<any>;
    stack: Map<number, Observer<any>>;
    checkInterbval: number;

    Init(url: string): void;

    private createWsSubject(observer, observable);

    Call(method: string, arg: Serial): Observable<any>;
}

export interface Serial {
    serializeBinary(): Uint8Array;
}
