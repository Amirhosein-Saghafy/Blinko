import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { SEND_MESSAGE, SET_SEEN_MESSAGES } from "../constant/urls";
import { CiSettings } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import { RiAttachment2 } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import ProfileImage from "../ui/ProfileImage";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { formatMessageTime } from "../utils/utils";
import { setNewMessage, updateMessages } from "../store/chatSlice";
import { getSocket } from "../utils/socket";
import Loader from "../ui/Loader";

function Chat() {
  const { data } = useLoaderData();
  const { user: myUser, chat } = useSelector((state) => state);
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const { id: userId } = useParams();

  const messageInputRef = useRef();
  const messageContainerRef = useRef();
  const attachmentInputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendMessageHandler = async () => {
    const message = messageInputRef.current.value;
    messageInputRef.current.value = "";

    if (message === "" && !attachmentInputRef.current.files[0]) return;

    const formData = new FormData();
    formData.append("receiverId", userId);
    formData.append("content", message);

    if (attachmentInputRef.current.files[0]) {
      formData.append("image", attachmentInputRef.current.files[0]);
      attachmentInputRef.current.value = "";
    }

    const response = await fetch(SEND_MESSAGE, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.status === 201) {
      const result = await response.json();

      setPendingImage(null);

      dispatch(updateMessages([...chat.messages, result.data]));
    } else toast.error("Failed to send message");
  };

  const selectImageHandler = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPendingImage(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPendingImage(null);
    }
  };

  const unseenMessagesHandler = useCallback(async () => {
    setLoader(true);

    const response = await fetch(`${SET_SEEN_MESSAGES}/${userId}`, {
      method: "PATCH",
      credentials: "include",
    });

    if (response.status === 200) {
      const messages = [...data];

      const updatedMessages = messages.map((msg) => {
        const newMsg = { ...msg };

        if (newMsg.senderId === userId && newMsg.receiverId === myUser._id)
          newMsg.seen = true;
        return newMsg;
      });

      dispatch(updateMessages(updatedMessages));

      setLoader(false);
    } else {
      navigate("/");
    }
  }, [data, dispatch, myUser, userId, navigate]);

  useEffect(() => {
    if (!myUser) {
      navigate("/");
    }

    unseenMessagesHandler();
  }, [myUser, navigate, unseenMessagesHandler]);

  useEffect(() => {
    const socket = getSocket();
    console.log(socket);

    if (!socket) return;

    const handler = (message) => {
      if (message.senderId === userId && message.receiverId === myUser._id) {
        dispatch(updateMessages([...chat.messages, message]));
        socket.emit("seenMessage", {
          senderId: userId,
          receiverId: myUser._id,
        });
      } else dispatch(setNewMessage());
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [dispatch, chat, myUser?._id, userId]);

  useEffect(() => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [chat]);

  return (
    <div
      className="h-[calc(100vh-40px)]"
      onClick={() => setShowEmojiBox(false)}
    >
      {loader && <Loader />}
      <div className="flex flex-col relative">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center">
            <ProfileImage
              imagePath={`http://127.0.0.1:8000/${chat?.selectedUser?.profileImage}`}
              // imagePath={`/${chat?.selectedUser?.profileImage}`}
              active={Object.keys(chat.onlineUsers).includes(userId)}
            />
            <div className="flex flex-col ml-3">
              <span className="text-sm text-zinc-800 font-semibold">
                {chat?.selectedUser?.userName}
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                {Object.keys(chat.onlineUsers).includes(userId)
                  ? "Online"
                  : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <button className="mr-4">
              <CiSearch size="20px" color="rgb(112,112,132)" />
            </button>
            <button>
              <CiSettings size="20px" color="rgb(112,112,132)" />
            </button>
          </div>
        </div>
        <div
          className="flex flex-col px-8 py-5 h-[calc(100vh-177px)] overflow-y-auto [&::-webkit-scrollbar]:w-[2px] 
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:bg-gray-300"
          ref={messageContainerRef}
        >
          {chat?.messages?.map((message) => {
            if (message.senderId === myUser?._id) {
              return (
                <div
                  className="flex items-end mt-10 ml-auto flex-row-reverse"
                  key={message._id}
                >
                  <div className="w-10 h-10 relative ml-5">
                    <img
                      src={`http://127.0.0.1:8000/${myUser.profileImage}`}
                      // src={`/${myUser.profileImage}`}
                      alt="profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {message.image && message.content ? (
                    <>
                      <div className="px-5 py-3 bg-[#f7f7f7] rounded-t-2xl rounded-es-2xl ml-5">
                        <img
                          src={`http://127.0.0.1:8000/${message.image}`}
                          // src={`/${message.image}`}
                          alt="message attachment"
                          className="max-w-96 max-h-48 object-cover rounded-md"
                        />
                        <p className="text-zinc-500 text-sm mt-4">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {formatMessageTime(message.postedAt)}
                      </span>
                    </>
                  ) : message.image ? (
                    <>
                      <div className="px-5 py-3 bg-[#f7f7f7] rounded-t-2xl rounded-es-2xl ml-5">
                        <img
                          src={`http://127.0.0.1:8000/${message.image}`}
                          // src={`/${message.image}`}
                          alt="message attachment"
                          className="max-w-96 max-h-48 object-cover rounded-md"
                        />
                      </div>
                      <span className="text-gray-400 text-xs">
                        {formatMessageTime(message.postedAt)}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="px-5 py-3 bg-[#f7f7f7] rounded-t-2xl rounded-es-2xl max-w-[450px] ml-5">
                        <p className="text-zinc-500 text-sm">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {formatMessageTime(message.postedAt)}
                      </span>
                    </>
                  )}
                </div>
              );
            } else if (message.receiverId === myUser?._id) {
              return (
                <div className="flex items-end mt-10" key={message._id}>
                  <div className="w-10 h-10 relative mr-5">
                    <img
                      src={`http://127.0.0.1:8000/${chat?.selectedUser?.profileImage}`}
                      // src={`/${chat?.selectedUser?.profileImage}`}
                      alt="profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {message.image && message.content ? (
                    <>
                      <div className="px-5 py-3 bg-[#ecf3fe] rounded-t-2xl rounded-ee-2xl mr-5">
                        <img
                          src={`http://127.0.0.1:8000/${message.image}`}
                          // src={`/${message.image}`}
                          alt="message attachment"
                          className="max-w-96 max-h-48 object-cover rounded-md"
                        />
                        <p className="text-zinc-500 text-sm mt-4">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {formatMessageTime(message.postedAt)}
                      </span>
                    </>
                  ) : message.image ? (
                    <>
                      <div className="px-5 py-3 bg-[#ecf3fe] rounded-t-2xl rounded-ee-2xl mr-5">
                        <img
                          src={`http://127.0.0.1:8000/${message.image}`}
                          // src={`/${message.image}`}
                          alt="message attachment"
                          className="max-w-96 max-h-48 object-cover rounded-md"
                        />
                      </div>
                      <span className="text-gray-400 text-xs">
                        {formatMessageTime(message.postedAt)}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="px-5 py-3 bg-[#ecf3fe] rounded-t-2xl rounded-ee-2xl max-w-[450px] mr-5">
                        <p className="text-zinc-500 text-sm">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {formatMessageTime(message.postedAt)}
                      </span>
                    </>
                  )}
                </div>
              );
            }
          })}
        </div>
        {pendingImage && (
          <div className="absolute bottom-[70px] right-8">
            <img
              src={pendingImage}
              alt="Preview"
              className="max-w-80 max-h-40 object-cover rounded-md"
            />
            <button
              className="absolute top-0 flex justify-center items-center right-0 transform translate-x-1/3 -translate-y-1/3 bg-black rounded-full w-6 h-6"
              onClick={() => {
                setPendingImage(null);
                attachmentInputRef.current.value = "";
              }}
            >
              <RxCross2 className="text-white" />
            </button>
          </div>
        )}
        <div className="flex justify-between items-center px-8 py-3 border-t border-t-[#f8f8f8]">
          <input
            type="text"
            name="message"
            placeholder="Type a message"
            className=" placeholder:text-zinc-500 text-zinc-800 text-sm font-semibold outline-none w-full pr-5"
            ref={messageInputRef}
          />
          <div className="flex items-center">
            <div className="flex mr-4">
              <label
                className="cursor-pointer mr-3"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEmojiBox(!showEmojiBox);
                }}
              >
                <BsEmojiSmile color="rgb(112,112,132)" size="20px" />
              </label>
              <EmojiPicker
                searchDisabled
                style={{ position: "absolute", bottom: "60px", right: "32px" }}
                height="400px"
                width="350px"
                emojiStyle="apple"
                open={showEmojiBox}
                onEmojiClick={(emoji) =>
                  (messageInputRef.current.value += emoji.emoji)
                }
              />
              <label htmlFor="attachment" className="cursor-pointer">
                <RiAttachment2 color="rgb(112,112,132)" size="20px" />
              </label>
              <input
                type="file"
                name="attachment"
                id="attachment"
                className="hidden"
                onChange={selectImageHandler}
                ref={attachmentInputRef}
              />
            </div>
            <button className="bg-[#4594fa] flex py-2 px-3 text-sm text-white items-center rounded-[4px]">
              <span className="text-white mr-2" onClick={sendMessageHandler}>
                Send
              </span>
              <LuSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
