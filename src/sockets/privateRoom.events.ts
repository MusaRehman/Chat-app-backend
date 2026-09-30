import { Server, Socket } from "socket.io";



export const registerAndListenPrivateRoomEvents = (io: Server, socket: Socket) => {

    socket.on("private-message:join", async (roomkey: string) => {
        console.log(`User ${socket.data?.username} (${socket.data?.userId}) joined room: ${roomkey}`);
        const sockets = await io.fetchSockets();

console.log(`User join roomkey: ${roomkey}`);

        const users = sockets.map((socket) => ({
            socketId: socket.id,
            userId: socket.data?.userId,
            username: socket.data?.username,
        }));
        console.log('users data', users);
        

        socket.join(roomkey);
    });

    socket.on("private-message:send", (data: { roomkey: string; message: string }) => {
        const { roomkey, message } = data;
        console.log(`User message roomkey: ${roomkey}`);

        io.to(roomkey).emit("private-message:receive", {
            username: socket.data?.username,
            userId: socket.data?.userId,
            hello: "hellow random",
            message,
        });
    });

    socket.on("private-message:leave", (roomkey: string) => {
        console.log(`User ${socket.data?.username} (${socket.data?.userId}) left room: ${roomkey}`);
        socket.leave(roomkey);
    });

}

