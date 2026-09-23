import http from "http";
import express from "express";
import { Server } from "socket.io";
import "dotenv/config";
import { sequelize } from "./config/postgress-connection";
import "./models";
import authRoutes from "./routes/auth";
import { authenticateSocketToken, authenticateToken } from "./helper/auth";
import { initializeSocket } from "./sockets";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

// Protected REST API routes
// app.use("/api/protected", authenticateToken, (req, res) => {
//   res.status(200).json({ message: "This is a protected route" });
// });

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Socket.io authentication middleware
io.use(authenticateSocketToken);

// Initialize socket Server
initializeSocket(io);

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