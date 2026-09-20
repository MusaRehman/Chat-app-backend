import http from "http";
import { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });


wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    // Echo the message back to the client
    ws.send(`Server received: ${message}`);
    ws.send(`current clients: ${wss.clients.size}` );
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
}
);
const PORT = 9091;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
