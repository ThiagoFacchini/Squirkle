var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express = __toESM(require("express"));
var import_http = __toESM(require("http"));
var import_socket = require("socket.io");
var import_cors = __toESM(require("cors"));

// src/modules/ticker.ts
var interval = 1e3;
var count = 0;
setInterval(() => {
  console.log(`ticking => ${count}`);
  count++;
  if (count > 10) {
    clearInterval(void 0);
    console.log("ticker stopped");
  }
}, interval);
function tick() {
  console.log("ticked");
}

// src/index.ts
var app = (0, import_express.default)();
app.use((0, import_cors.default)());
var server = import_http.default.createServer(app);
var io = new import_socket.Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});
tick();
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
  console.log("[SERVER] - Running at port 3000");
});
//# sourceMappingURL=index.js.map
