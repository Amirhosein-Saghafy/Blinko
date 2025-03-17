import { io } from "socket.io-client";

function connect(userId) {
  const socket = io("http://127.0.0.1:8000", { auth: { userId } });

  socket.on("updateOnlineUsers", (users) => {
    console.log(users);
  });
}

export { connect };
