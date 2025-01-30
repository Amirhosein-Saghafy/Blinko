import { Outlet } from "react-router-dom";
import profile from "../assets/images/profile.jpg";
import { CiSearch } from "react-icons/ci";
import ProfileImage from "./ProfileImage";

function Layout() {
  return (
    <main className="bg-[#f5f7fb]">
      <div className="w-10/12 py-5 mx-auto">
        <div className="flex justify-between items-start">
          <section className="w-1/4 inline-block bg-white rounded-lg relative">
            <div
              className="w-full flex flex-col h-[calc(100vh-40px)] overflow-y-scroll [&::-webkit-scrollbar]:w-[2px] 
              [&::-webkit-scrollbar-track]:bg-gray-100
              [&::-webkit-scrollbar-thumb]:bg-gray-300"
            >
              <div className="px-3 py-2 flex justify-start items-center border-b border-b-gray-100">
                <button className="py-2">
                  <CiSearch size="24px" color="rgb(113,113,122)" />
                </button>
                <div className="ml-1">
                  <input
                    type="text"
                    className="p-2 text-sm text-zinc-500 placeholder:text-zinc-300 placeholder:text-sm outline-none"
                    placeholder="Search ..."
                  />
                </div>
              </div>
              <ul className="flex flex-col">
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center">
                  <ProfileImage imagePath={profile} active={true} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </li>
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center shadow-[2px_2px_10px_0px_rgb(240,240,240),-2px_-2px_10px_0px_rgb(240,240,240)]">
                  <ProfileImage imagePath={profile} active={true} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </div>
                </li>
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center">
                  <ProfileImage imagePath={profile} active={false} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </div>
                </li>
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center">
                  <ProfileImage imagePath={profile} active={true} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </li>
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center">
                  <ProfileImage imagePath={profile} active={false} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </div>
                </li>
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center">
                  <ProfileImage imagePath={profile} active={true} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </li>
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center">
                  <ProfileImage imagePath={profile} active={true} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </li>
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center">
                  <ProfileImage imagePath={profile} active={true} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </li>
                <li className="px-2 py-4 border-b border-b-gray-200 flex justify-between items-center">
                  <ProfileImage imagePath={profile} active={true} />
                  <div className="w-[80%]">
                    <div className="w-full mb-1 flex justify-between items-center">
                      <span className="font-semibold">John</span>
                      <span className="text-gray-400 text-xs font-semibold">
                        3:15 PM
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className="w-[74%] inline-block bg-white rounded-lg overflow-hidden relative">
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Layout;
