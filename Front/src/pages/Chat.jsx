import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { SEND_MESSAGE } from "../constant/urls";
import { CiSettings } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import { RiAttachment2 } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import ProfileImage from "../ui/ProfileImage";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { formatMessageTime } from "../utils/utils";

function Chat() {
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const { data } = useLoaderData();
  const { user: myUser, chat: chatSelected } = useSelector((state) => state);

  const { id: userId } = useParams();

  const messageInputRef = useRef();

  const sendMessageHandler = async () => {
    const message = messageInputRef.current.value;

    if (message === "") return;

    const data = { receiverId: userId, content: message };

    const result = await fetch(SEND_MESSAGE, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 201) toast.success("Message sent successfully");
    else toast.error("Failed to send message");
  };

  return (
    <div
      className="h-[calc(100vh-40px)]"
      onClick={() => setShowEmojiBox(false)}
    >
      <div className="flex flex-col relative">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center">
            <ProfileImage
              imagePath={`http://127.0.0.1:8000/${chatSelected.profileImage}`}
              active={true}
            />
            <div className="flex flex-col ml-3">
              <span className="text-sm text-zinc-800 font-semibold">
                {chatSelected?.userName}
              </span>
              <span className="text-xs text-gray-400 font-semibold">
                Active Now
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
        >
          {data.map((chat) => {
            if (chat.senderId === myUser._id) {
              return (
                <div
                  className="flex items-end mt-10 ml-auto flex-row-reverse"
                  key={chat._id}
                >
                  <div className="w-10 h-10 relative ml-5">
                    <img
                      src={`http://127.0.0.1:8000/${myUser.profileImage}`}
                      alt="profile"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="px-5 py-3 bg-[#f7f7f7] rounded-t-2xl rounded-es-2xl max-w-[450px] ml-5">
                    <p className="text-zinc-500 text-sm">{chat.content}</p>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {formatMessageTime(chat.postedAt)}
                  </span>
                </div>
              );
            } else if (chat.receiverId === myUser._id) {
              return (
                <div className="flex items-end" key={chat._id}>
                  <div className="w-10 h-10 relative mr-5">
                    <img
                      src={`http://127.0.0.1:8000/${chatSelected.profileImage}`}
                      alt="profile"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="px-5 py-3 bg-[#ecf3fe] rounded-t-2xl rounded-ee-2xl max-w-[450px] mr-5">
                    <p className="text-zinc-500 text-sm">{chat.content}</p>
                  </div>
                  <span className="text-gray-400 text-xs">{formatMessageTime(chat.postedAt)}</span>
                </div>
              );
            }
          })}
        </div>
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
