import { io } from "socket.io-client";

function connect() {
  const socket = io("http://127.0.0.1:8000", {
    autoConnect: false,
    auth: { serverOffset: 0 },
  });

  socket.connect();
}

export { connect };
