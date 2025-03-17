import { io } from "socket.io-client";
import store from "../store/store";
import { updateOnlineUsersList } from "../store/chatSlice";

function connect(userId) {
  const socket = io("http://127.0.0.1:8000", { auth: { userId } });

  socket.on("updateOnlineUsers", (users) => {
    store.dispatch(updateOnlineUsersList(users));

    console.log(users);
  });
}

export { connect };
