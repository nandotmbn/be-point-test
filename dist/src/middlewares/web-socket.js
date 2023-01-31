"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interval;
function WebSocket(io) {
    io.on('connection', function (socket) {
        socket.on('disconnect', function () {
            clearInterval(interval);
        });
    });
}
exports.default = WebSocket;
