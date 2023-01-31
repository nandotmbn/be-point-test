"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = __importDefault(require("../views/message"));
var logger_error_1 = __importDefault(require("./logger-error"));
function default_1(err, req, res, next) {
    logger_error_1.default.error(err.message);
    res.status(500).send((0, message_1.default)({
        statusCode: 500,
        message: "Internal Server Error",
        data: err.message,
    }));
}
exports.default = default_1;
