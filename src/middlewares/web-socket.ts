import { Server, Socket } from "socket.io";

let interval: any;

function WebSocket(io: Server) {
    io.on('connection', (socket: Socket) => {
        socket.on('disconnect', () => {
            clearInterval(interval);
        });
    });
}

export default WebSocket;