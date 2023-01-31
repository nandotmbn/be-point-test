"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_info_1 = __importDefault(require("./logger-info"));
function default_1(req, res, next) {
    logger_info_1.default.log("info", "".concat(req.method, " ").concat(req.path, " from ").concat(req.ip, " at ").concat(new Date().toLocaleString()));
    next();
}
exports.default = default_1;
