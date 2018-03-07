// package: rpcproto
// file: pb/pb.proto

import * as jspb from "google-protobuf";

export class Message extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getMethod(): string;
  setMethod(value: string): void;

  getArg(): Uint8Array | string;
  getArg_asU8(): Uint8Array;
  getArg_asB64(): string;
  setArg(value: Uint8Array | string): void;

  getReply(): Uint8Array | string;
  getReply_asU8(): Uint8Array;
  getReply_asB64(): string;
  setReply(value: Uint8Array | string): void;

  hasError(): boolean;
  clearError(): void;
  getError(): Error | undefined;
  setError(value?: Error): void;

  getInstream(): boolean;
  setInstream(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    id: number,
    method: string,
    arg: Uint8Array | string,
    reply: Uint8Array | string,
    error?: Error.AsObject,
    instream: boolean,
  }
}

export class Error extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Error.AsObject;
  static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Error;
  static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
  export type AsObject = {
    code: number,
    message: string,
  }
}

