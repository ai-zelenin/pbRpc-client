/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.rpcproto.Error', null, global);
goog.exportSymbol('proto.rpcproto.Message', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.rpcproto.Message = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.rpcproto.Message, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.rpcproto.Message.displayName = 'proto.rpcproto.Message';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.rpcproto.Message.prototype.toObject = function (opt_includeInstance) {
        return proto.rpcproto.Message.toObject(opt_includeInstance, this);
    };


    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.rpcproto.Message} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.rpcproto.Message.toObject = function (includeInstance, msg) {
        var f, obj = {
            id: jspb.Message.getFieldWithDefault(msg, 1, 0),
            method: jspb.Message.getFieldWithDefault(msg, 2, ""),
            arg: msg.getArg_asB64(),
            reply: msg.getReply_asB64(),
            error: (f = msg.getError()) && proto.rpcproto.Error.toObject(includeInstance, f),
            instream: jspb.Message.getFieldWithDefault(msg, 7, false)
        };

        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.rpcproto.Message}
 */
proto.rpcproto.Message.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.rpcproto.Message;
    return proto.rpcproto.Message.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.rpcproto.Message} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.rpcproto.Message}
 */
proto.rpcproto.Message.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readUint64());
                msg.setId(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setMethod(value);
                break;
            case 4:
                var value = /** @type {!Uint8Array} */ (reader.readBytes());
                msg.setArg(value);
                break;
            case 5:
                var value = /** @type {!Uint8Array} */ (reader.readBytes());
                msg.setReply(value);
                break;
            case 6:
                var value = new proto.rpcproto.Error;
                reader.readMessage(value, proto.rpcproto.Error.deserializeBinaryFromReader);
                msg.setError(value);
                break;
            case 7:
                var value = /** @type {boolean} */ (reader.readBool());
                msg.setInstream(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.rpcproto.Message.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.rpcproto.Message.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.rpcproto.Message} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rpcproto.Message.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getId();
    if (f !== 0) {
        writer.writeUint64(
            1,
            f
        );
    }
    f = message.getMethod();
    if (f.length > 0) {
        writer.writeString(
            2,
            f
        );
    }
    f = message.getArg_asU8();
    if (f.length > 0) {
        writer.writeBytes(
            4,
            f
        );
    }
    f = message.getReply_asU8();
    if (f.length > 0) {
        writer.writeBytes(
            5,
            f
        );
    }
    f = message.getError();
    if (f != null) {
        writer.writeMessage(
            6,
            f,
            proto.rpcproto.Error.serializeBinaryToWriter
        );
    }
    f = message.getInstream();
    if (f) {
        writer.writeBool(
            7,
            f
        );
    }
};


/**
 * optional uint64 id = 1;
 * @return {number}
 */
proto.rpcproto.Message.prototype.getId = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.rpcproto.Message.prototype.setId = function (value) {
    jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string method = 2;
 * @return {string}
 */
proto.rpcproto.Message.prototype.getMethod = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.rpcproto.Message.prototype.setMethod = function (value) {
    jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bytes arg = 4;
 * @return {!(string|Uint8Array)}
 */
proto.rpcproto.Message.prototype.getArg = function () {
    return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes arg = 4;
 * This is a type-conversion wrapper around `getArg()`
 * @return {string}
 */
proto.rpcproto.Message.prototype.getArg_asB64 = function () {
    return /** @type {string} */ (jspb.Message.bytesAsB64(
        this.getArg()));
};


/**
 * optional bytes arg = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getArg()`
 * @return {!Uint8Array}
 */
proto.rpcproto.Message.prototype.getArg_asU8 = function () {
    return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
        this.getArg()));
};


/** @param {!(string|Uint8Array)} value */
proto.rpcproto.Message.prototype.setArg = function (value) {
    jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional bytes reply = 5;
 * @return {!(string|Uint8Array)}
 */
proto.rpcproto.Message.prototype.getReply = function () {
    return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * optional bytes reply = 5;
 * This is a type-conversion wrapper around `getReply()`
 * @return {string}
 */
proto.rpcproto.Message.prototype.getReply_asB64 = function () {
    return /** @type {string} */ (jspb.Message.bytesAsB64(
        this.getReply()));
};


/**
 * optional bytes reply = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getReply()`
 * @return {!Uint8Array}
 */
proto.rpcproto.Message.prototype.getReply_asU8 = function () {
    return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
        this.getReply()));
};


/** @param {!(string|Uint8Array)} value */
proto.rpcproto.Message.prototype.setReply = function (value) {
    jspb.Message.setProto3BytesField(this, 5, value);
};


/**
 * optional Error error = 6;
 * @return {?proto.rpcproto.Error}
 */
proto.rpcproto.Message.prototype.getError = function () {
    return /** @type{?proto.rpcproto.Error} */ (
        jspb.Message.getWrapperField(this, proto.rpcproto.Error, 6));
};


/** @param {?proto.rpcproto.Error|undefined} value */
proto.rpcproto.Message.prototype.setError = function (value) {
    jspb.Message.setWrapperField(this, 6, value);
};


proto.rpcproto.Message.prototype.clearError = function () {
    this.setError(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.rpcproto.Message.prototype.hasError = function () {
    return jspb.Message.getField(this, 6) != null;
};


/**
 * optional bool inStream = 7;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.rpcproto.Message.prototype.getInstream = function () {
    return /** @type {boolean} */ (jspb.Message.getFieldWithDefault(this, 7, false));
};


/** @param {boolean} value */
proto.rpcproto.Message.prototype.setInstream = function (value) {
    jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.rpcproto.Error = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.rpcproto.Error, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.rpcproto.Error.displayName = 'proto.rpcproto.Error';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.rpcproto.Error.prototype.toObject = function (opt_includeInstance) {
        return proto.rpcproto.Error.toObject(opt_includeInstance, this);
    };


    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.rpcproto.Error} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.rpcproto.Error.toObject = function (includeInstance, msg) {
        var f, obj = {
            code: jspb.Message.getFieldWithDefault(msg, 1, 0),
            message: jspb.Message.getFieldWithDefault(msg, 2, "")
        };

        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.rpcproto.Error}
 */
proto.rpcproto.Error.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.rpcproto.Error;
    return proto.rpcproto.Error.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.rpcproto.Error} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.rpcproto.Error}
 */
proto.rpcproto.Error.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readInt32());
                msg.setCode(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setMessage(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.rpcproto.Error.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.rpcproto.Error.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.rpcproto.Error} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.rpcproto.Error.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getCode();
    if (f !== 0) {
        writer.writeInt32(
            1,
            f
        );
    }
    f = message.getMessage();
    if (f.length > 0) {
        writer.writeString(
            2,
            f
        );
    }
};


/**
 * optional int32 code = 1;
 * @return {number}
 */
proto.rpcproto.Error.prototype.getCode = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.rpcproto.Error.prototype.setCode = function (value) {
    jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.rpcproto.Error.prototype.getMessage = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.rpcproto.Error.prototype.setMessage = function (value) {
    jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto.rpcproto);
