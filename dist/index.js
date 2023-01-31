"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var express_1 = __importDefault(require("express"));
var startup_1 = __importDefault(require("./src/middlewares/startup"));
var web_socket_1 = __importDefault(require("./src/middlewares/web-socket"));
var error_1 = __importDefault(require("./src/middlewares/error"));
var socket_io_1 = require("socket.io");
var dotenv_1 = __importDefault(require("dotenv"));
var auth_routes_1 = __importDefault(require("./src/routes/auth-routes"));
var chat_routes_1 = __importDefault(require("./src/routes/chat-routes"));
var chat_group_routes_1 = __importDefault(require("./src/routes/chat-group-routes"));
var group_routes_1 = __importDefault(require("./src/routes/group-routes"));
var header_language_1 = __importDefault(require("./src/controllers/headers/header-language"));
var info_1 = __importDefault(require("./src/middlewares/info"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var http = require("http").createServer(app);
var io = new socket_io_1.Server(http, {
    cors: { origin: "*" },
});
(0, startup_1.default)(app, io);
(0, web_socket_1.default)(io);
app.use(info_1.default);
app.use(header_language_1.default);
app.use("/api/v1", auth_routes_1.default); // Authentications Routes
app.use("/api/v1", chat_routes_1.default); // Chats Routes
app.use("/api/v1", chat_group_routes_1.default); // Chats Routes
app.use("/api/v1", group_routes_1.default); // Chats Routes
app.use(error_1.default);
var port = process.env.PORT || 8888;
http.listen(port, function () { return console.log("App is listening on port ".concat(port)); });
