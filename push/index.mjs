import { createServer } from "http";
import { server as WebSocketServer } from "websocket";

let connections = [];

const httpServer = createServer();

const websocket = new WebSocketServer({ httpServer });

httpServer.listen(8080, () => {
  console.log("My server is running on 8080");
});

websocket.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  connections.push(connection);

  connections.forEach((c) =>
    c.send(`User${connection.socket.remotePort} just connected`)
  );

  connection.on("message", (message) => {
    connections.forEach((c) =>
      c.send(`User${connection.socket.remotePort} says ${message.utf8Data}`)
    );
  });
});

// client code
// let ws = new WebSocket("ws:localhost:8080");
// ws.onmessage = (message) => console.log(`${message.data}`);
