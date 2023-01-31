"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGroupId = exports.validateChatGroup = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importDefault(require("mongoose"));
var ts_joi_objectid_1 = require("ts-joi-objectid");
var MyJoi = (0, ts_joi_objectid_1.joiObjectId)(joi_1.default);
var ChatGroupSchema = new mongoose_1.default.Schema({
    groupId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        minlength: 0,
        maxlength: 64,
        trim: true,
    },
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        minlength: 0,
        maxlength: 64,
        trim: true,
    },
    contentType: {
        type: String,
        enum: ["chat", "image"],
        default: "chat",
        required: true,
    },
    content: {
        type: String,
    },
    isDeletedMe: {
        type: Boolean,
        default: false,
    },
});
var ChatGroup = mongoose_1.default.model("ChatGroup", ChatGroupSchema);
function validateChatGroup(chat) {
    var schema = joi_1.default.object({
        content: joi_1.default.string().min(1).max(500).required(),
    });
    return schema.validate(chat);
}
exports.validateChatGroup = validateChatGroup;
function validateGroupId(id) {
    var schema = joi_1.default.object({
        groupId: MyJoi().required(),
    });
    return schema.validate(id);
}
exports.validateGroupId = validateGroupId;
exports.default = ChatGroup;
