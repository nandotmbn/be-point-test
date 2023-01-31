"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
function default_1(app, io) {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default
        .connect("mongodb+srv://orlandosykes:orlandosykes@technorcluster.0ayow.mongodb.net/Boilerplate?retryWrites=true&w=majority")
        .then(function () { return console.log("Connected to MongoDB"); })
        .catch(function (e) {
        throw new Error("Error : " + e);
    });
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
        next();
    });
    app.use("/static", express_1.default.static("static"));
    app.use(body_parser_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.set("trust proxy", true);
    app.use((0, cors_1.default)({
        exposedHeaders: "x-auth-token",
    }));
    app.set("socketIo", io);
}
exports.default = default_1;
