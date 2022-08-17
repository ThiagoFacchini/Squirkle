// src/index.ts
var express = require("express");
var http = require("http");
var { Server } = require("socket.io");
var cors = require("cors");
var app = express();
app.use(cors());
var server = http.createServer(app);
var io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log(`User connect ${socket.id}`);
  socket.on("client", (data) => {
    console.log("Message received - topic: client - message:");
    console.log(data);
    console.log("emitting...");
    socket.emit("dada", {
      message: "Server message"
    });
    console.log("emitted");
  });
});
server.listen(3e3, () => {
  console.log("[SERVER]: - Running at port 3000");
});
//# sourceMappingURL=index.js.map
