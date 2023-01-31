import "express-async-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import Startup from "./src/middlewares/startup";
import WebSocket from "./src/middlewares/web-socket";
import error from "./src/middlewares/error";
import { Server } from "socket.io";
import dotEnv from "dotenv";

import AuthRoutes from "./src/routes/auth-routes";
import ChatRoutes from "./src/routes/chat-routes";
import headerLanguange from "./src/controllers/headers/header-language";
import requestInfoLogger from "./src/middlewares/info";

dotEnv.config();
const app: Express = express();
const http = require("http").createServer(app);
const io = new Server(http, {
	cors: { origin: "*" },
});

Startup(app, io);
WebSocket(io);
app.use(requestInfoLogger);
app.use(headerLanguange);

app.use("/api/v1", AuthRoutes); // Authentications Routes
app.use("/api/v1", ChatRoutes); // Chats Routes

app.use(error);
const port = process.env.PORT || 8888;
http.listen(port, () => console.log(`App is listening on port ${port}`));
