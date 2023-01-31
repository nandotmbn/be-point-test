"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
var joi_1 = __importDefault(require("joi"));
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        minlength: 0,
        maxlength: 64,
        trim: true,
    },
    phoneNumber: {
        type: String,
    },
});
var User = mongoose_1.default.model("User", UserSchema);
function validateUser(User) {
    var schema = joi_1.default.object({
        fullName: joi_1.default.string().min(3).max(64).required(),
        phoneNumber: joi_1.default.string().min(10).max(64).required(),
    });
    return schema.validate(User);
}
exports.validateUser = validateUser;
exports.default = User;
