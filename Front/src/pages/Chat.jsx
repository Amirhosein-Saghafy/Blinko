import profile from "../assets/images/profile.jpg";
import EmojiPicker from "emoji-picker-react";
import { CiSettings } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import { RiAttachment2 } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";

function Chat() {
  return (
    <div className="min-h-[calc(100vh-40px)]">
      <div className="flex flex-col relative">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 relative">
              <div className="w-3 h-3 rounded-full bg-white absolute top-0 right-0 flex items-center justify-center z-50">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <img
                src={profile}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col ml-3">
              <span className="text-sm text-zinc-800 font-semibold">
                Jennifer Fritz
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
          <div className="flex items-end">
            <div className="w-10 h-10 relative mr-5">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="px-5 py-3 bg-[#ecf3fe] rounded-t-2xl rounded-ee-2xl max-w-[450px] mr-5">
              <p className="text-zinc-500 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus necessitatibus consequatur quis, ducimus officia velit?
                At fuga sint earum ad.
              </p>
            </div>
            <span className="text-gray-400 text-xs">3:15 PM</span>
          </div>
          <div className="flex items-end mt-10 ml-auto flex-row-reverse">
            <div className="w-10 h-10 relative ml-5">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="px-5 py-3 bg-[#f7f7f7] rounded-t-2xl rounded-es-2xl max-w-[450px] ml-5">
              <p className="text-zinc-500 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <span className="text-gray-400 text-xs">3:15 PM</span>
          </div>
          <div className="flex items-end mt-10">
            <div className="w-10 h-10 relative mr-5">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="px-5 py-3 bg-[#ecf3fe] rounded-t-2xl rounded-ee-2xl max-w-[450px] mr-5">
              <p className="text-zinc-500 text-sm">Lorem ipsum dolor sit.</p>
            </div>
            <span className="text-gray-400 text-xs">3:15 PM</span>
          </div>
          <div className="flex items-end mt-10 ml-auto flex-row-reverse">
            <div className="w-10 h-10 relative ml-5">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="px-5 py-3 bg-[#f7f7f7] rounded-t-2xl rounded-es-2xl max-w-[450px] ml-5">
              <p className="text-zinc-500 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <span className="text-gray-400 text-xs">3:15 PM</span>
          </div>
          <div className="flex items-end mt-10">
            <div className="w-10 h-10 relative mr-5">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="px-5 py-3 bg-[#ecf3fe] rounded-t-2xl rounded-ee-2xl max-w-[450px] mr-5">
              <p className="text-zinc-500 text-sm">Lorem ipsum dolor sit.</p>
            </div>
            <span className="text-gray-400 text-xs">3:15 PM</span>
          </div>
          <div className="flex items-end mt-10">
            <div className="w-10 h-10 relative mr-5">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="px-5 py-3 bg-[#ecf3fe] rounded-t-2xl rounded-ee-2xl max-w-[450px] mr-5">
              <p className="text-zinc-500 text-sm">Lorem ipsum dolor sit.</p>
            </div>
            <span className="text-gray-400 text-xs">3:15 PM</span>
          </div>
        </div>
        <div className="flex justify-between items-center px-8 py-3 border-t border-t-[#f8f8f8]">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Type a message"
              className=" placeholder:text-zinc-500 text-xs font-semibold outline-none"
            />
          </div>
          <div className="flex items-center">
            <div className="flex mr-4">
              <label className="cursor-pointer mr-3">
                <BsEmojiSmile color="rgb(112,112,132)" size="20px" />
              </label>
              <EmojiPicker
                searchDisabled
                style={{ position: "absolute", bottom: "60px", right: "32px" }}
                height="400px"
                width="350px"
                emojiStyle="apple"
                open={false}
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
              <span className="text-white mr-2">Send</span>
              <LuSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
