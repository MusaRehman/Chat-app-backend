import http from "http";
import express from "express";
import { Server } from "socket.io";
import "dotenv/config";
import { sequelize } from "./config/postgress-connection";
import "./models";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    console.log("Received message:", data);

    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");

    await sequelize.sync();
    console.log("Database synchronized");

    const PORT = 9091;

    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();