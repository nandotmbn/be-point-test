"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var language_json_1 = __importDefault(require("../../static/language.json"));
var message_1 = __importDefault(require("../../views/message"));
function headerLanguange(req, res, next) {
    var isIncluded = false;
    if (!req.headers["accept-language"])
        return res.status(400).send((0, message_1.default)({
            statusCode: 400,
            message: "Accept Language does not exist",
            data: {
                message: "You have to use listed language",
                listedLanguage: language_json_1.default,
            },
        }));
    language_json_1.default.forEach(function (lang) {
        if (req.headers["accept-language"] == lang)
            isIncluded = true;
    });
    if (!isIncluded)
        return res.status(400).send((0, message_1.default)({
            statusCode: 400,
            message: "Accept Language Not Included",
            data: {
                message: "You have to use listed language",
                listedLanguage: language_json_1.default,
            },
        }));
    next();
}
exports.default = headerLanguange;
