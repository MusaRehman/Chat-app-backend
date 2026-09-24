import { Server } from "socket.io";
import { registerGlobalChatEvents } from "./global.events";

export const initializeSocket = (io: Server) => {

    io.on("connection", (socket) => {
        console.log('socket info', socket.data);
        
        if (!socket.data.authenticated) {
            console.log(`Guest User connected: ${socket.data?.userId}`);
            // Register global chat events for guests
            registerGlobalChatEvents(io, socket);
        } else {
            registerPrivateRoomEvents(io, socket);
            console.log(`User connected: ${socket.data?.username} (${socket.data?.userId}) `);
        }
    });

};