"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = __importDefault(require("../../views/message"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function headerAccessToken(req, res, next) {
    if (!req.headers["authorization"])
        return res.status(401).send((0, message_1.default)({
            statusCode: 401,
            message: "Unauthorized",
            data: {
                message: "You have to login first",
            },
        }));
    var decode = jsonwebtoken_1.default.verify(req.headers.authorization.split(" ")[1], process.env.jwtPrivateKey);
    req.query._id = JSON.parse(JSON.stringify(decode))._id;
    next();
}
exports.default = headerAccessToken;
