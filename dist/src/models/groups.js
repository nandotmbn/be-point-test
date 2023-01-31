"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTsId = exports.validateGroup = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importDefault(require("mongoose"));
var ts_joi_objectid_1 = require("ts-joi-objectid");
var MyJoi = (0, ts_joi_objectid_1.joiObjectId)(joi_1.default);
var GroupSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        minlength: 0,
        maxlength: 64,
        trim: true,
    },
    tsId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        minlength: 0,
        maxlength: 64,
        trim: true,
    },
});
var Group = mongoose_1.default.model("Group", GroupSchema);
function validateGroup(Group) {
    var schema = joi_1.default.object({
        fullName: joi_1.default.string().min(3).max(64).required(),
    });
    return schema.validate(Group);
}
exports.validateGroup = validateGroup;
function validateTsId(id) {
    var schema = joi_1.default.object({
        receiverId: MyJoi().required(),
    });
    return schema.validate(id);
}
exports.validateTsId = validateTsId;
exports.default = Group;
