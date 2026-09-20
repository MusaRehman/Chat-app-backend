import http from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { sequelize } from "./config/postgress-connection";
import "./models";
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected");

    await sequelize.sync();

    console.log("Database synchronized");

    // Start HTTP / Socket.IO server here
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();

io.on("connection", (socket)=>{
  console.log("A user connected");

  socket.on("message", (data) => {
    console.log("Received message:", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  }); 

})

const PORT = 9091;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
