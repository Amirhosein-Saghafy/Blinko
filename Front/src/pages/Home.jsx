import { Fragment, useEffect } from "react";
import bg from "../assets/images/bg.jpg";
import { getSocket } from "../utils/socket";
import { useDispatch } from "react-redux";
import { setNewMessage } from "../store/chatSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    let socket, handler;
    const socketFetcher = setInterval(() => {
      socket = getSocket();
      if (!socket) return;

      handler = () => {
        debugger;
        dispatch(setNewMessage());
      };

      socket.on("newMessage", handler);
      clearInterval(socketFetcher);
    }, 100);

    return () => {
      clearInterval(socketFetcher); //if interval is still running
      if (socket) socket.off("newMessage", handler);
    };
  }, [dispatch]);

  return (
    <Fragment>
      <img
        src={bg}
        alt="background"
        className="w-full h-full absolute object-cover"
      />
      <div className="flex justify-center items-center min-h-[calc(100vh-40px)]">
        <div className="py-2 px-3 rounded-2xl z-10">
          <p className="font-semibold text-sm text-zinc-600">
            Select Chat to Start Messaging
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
