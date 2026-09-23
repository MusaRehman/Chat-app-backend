import { Server, Socket } from "socket.io";



export const registerGlobalChatEvents = (io: Server, socket: Socket) => {
    socket.on("global-chat-message", (message: string) => {
        console.log(message);
        console.log('Received Message for guests message.');
        // for self message 
        // socket.emit("global-chat-message", message);
        // for all connected clients
        socket.broadcast.emit("global-chat-message", message);
    });
}