import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "~/util/types";

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (res.socket.server.io) {
        console.log("socket already running")
    } else {
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: false
        });

        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log(socket)
            socket.on('join-room', (roomId, userId) => {
                console.log(`a new user ${userId} joined room ${roomId}`)
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-connected', userId)
            })

            socket.on('user-toggle-audio', (userId, roomId) => {
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-toggle-audio', userId)
            })

            socket.on('user-toggle-video', (userId, roomId) => {
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-toggle-video', userId)
            })

            socket.on('user-leave', (userId, roomId) => {
                console.log(`user ${userId} left room ${roomId}`)
                socket.join(roomId)
                socket.broadcast.to(roomId).emit('user-leave', userId)
            })
        })
    }
    res.end();
}

export default ioHandler