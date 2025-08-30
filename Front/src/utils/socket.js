import { io } from "socket.io-client";
import store from "../store/store";
import { updateOnlineUsersList } from "../store/chatSlice";

let socket = null;

function connect(userId) {
  socket = io("http://127.0.0.1:8000", { auth: { userId } });
  // socket = io("", { auth: { userId } });

  socket.on("updateOnlineUsers", (users) => {
    store.dispatch(updateOnlineUsersList(users));
  });
}

function getSocket() {
  return socket;
}

export { connect, getSocket };
