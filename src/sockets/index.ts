import { Server } from "socket.io";
import { registerGlobalChatEvents } from "./global.events";
import { registerAndListenPrivateRoomEvents } from "./privateRoom.events";

export const initializeSocket = (io: Server) => {

    io.on("connection", (socket) => {
        console.log('socket info', socket.data);
        
        if (!socket.data.authenticated) {
            console.log(`Guest User connected: ${socket.data?.userId}`);
            // Register global chat events for guests
            registerGlobalChatEvents(io, socket);
        } else {
            registerAndListenPrivateRoomEvents(io, socket);
            console.log(`Authenticated User connected: ${socket.data} `);
        }
    });

};