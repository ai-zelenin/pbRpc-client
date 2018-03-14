# pbRpc-client

Protbuf over websocket transport typescript client class

## Usage
### Angular
Make proto file
```protobuf
syntax = "proto3";
package bench;

service Bench {
    rpc Echo (BenchArg) returns (BenchReply);
    rpc EchoStream (BenchArg) returns (stream BenchReply);
    rpc EchoBiStream (stream BenchArg) returns (stream BenchReply);
}

message BenchArg {
    string val = 1;
}
message BenchReply {
    string val = 1;
}
```
Generate  frontend(typescript) and backend(golang,c++) source files
```bash
function gen-go() {
    ${PROTOC} -I "${PROTOC_INCLUDE}" \
    -I . \
    -I ${GOPATH}/src \
    -I ${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
    --gofast_out=plugins=grpc:"$2" "$1"
}
function gen-cpp() {
    ${PROTOC} -I "${PROTOC_INCLUDE}" \
    -I . \
    -I ${GOPATH}/src \
    -I ${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
    --cpp_out=:"$2" "$1"
}
function gen-ts() {
    ${PROTOC} -I "${PROTOC_INCLUDE}" \
    -I . \
    -I ${GOPATH}/src \
    -I ${GOPATH}/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
    --js_out=import_style=commonjs,binary:"$2" \
    --plugin=protoc-gen-ts="$HOME"/.npm-global/bin/protoc-gen-ts --ts_out=service=true:"$2" "$1"
}
```
Create service
```typescript
import {Injectable} from "@angular/core";
import {PbRPC, Serial} from "pbrpc";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RpcService {
  public url = "ws://localhost:8080/ws";
  public pbRpc = new PbRPC();


  constructor() {
    this.pbRpc.Init(this.url);
  }

  Call(method: string, arg: Serial): Observable<any> {
    return this.pbRpc.Call(method, arg);
  }

  KillStream(id: number) {
    this.pbRpc.KillStream(id);
  }

}
```
Use in from component
```typescript
import {Component, OnInit} from "@angular/core";
import {RpcService} from "./rpc.service";
import {Message} from "pbrpc/pb/rpc_pb";
import {BenchArg, BenchReply} from "../../pb/bench/srv_pb";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  requestLimit = 25000;
  respCounter = 0;
  reqCounter = 0;
  rps = 0;

  constructor(private rpc: RpcService) {
  }

  ngOnInit(): void {
    // Start()
  }

  Start() {
    const start = +new Date();
    let reqCounter = 0.0;
    let respCounter = 0;
    console.log(start);
    do {
      reqCounter++;
      const benchReq = new BenchArg();
      benchReq.setVal("test");
      this.rpc.Call("Bench.Echo", benchReq).subscribe(resp => {
        this.respCounter++;
        respCounter++;
        if (respCounter === this.requestLimit) {
          const end = +new Date();
          console.log(end);
          const diff = end - start;
          console.log(diff);
          this.rps = this.requestLimit / (diff / 1000);
        }
      });
      this.reqCounter++;
    } while (reqCounter !== this.requestLimit);
  }
}
```
