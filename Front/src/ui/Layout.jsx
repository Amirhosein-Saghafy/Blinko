import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import ProfileImage from "./ProfileImage";
import { useCallback, useEffect, useState } from "react";
import {
  GET_ALL_USERS,
  GET_LAST_MESSAGE_TIME,
  GET_UNSEEN_MESSAGES,
  LOGIN,
} from "../constant/urls";
import Loader from "./Loader";
import { connect, getSocket } from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import { selectUser } from "../store/chatSlice";
import { formatTimeAgo } from "../utils/utils";

function Layout() {
  const { user, chat } = useSelector((state) => state);

  const [users, setUsers] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMessages, setLastMessages] = useState([]);
  const [unseenMessages, setUnseenMessages] = useState([]);

  const navigation = useNavigation();
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch(GET_ALL_USERS, { credentials: "include" });
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      setUsers(result.data);
    } catch (error) {
      if (error === "Invalid credentials") navigate("/login");
    } finally {
      setLoadingUsers(false);
    }
  }, [navigate]);

  const checkAuthentication = useCallback(async () => {
    try {
      const response = await fetch(LOGIN, {
        credentials: "include",
        method: "POST",
      });

      if (response.status === 200) {
        const result = await response.json();

        dispatch(loginUser(result.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, navigate]);

  const getLastMessageTime = useCallback(
    async (users) => {
      try {
        if (!users) return;
        const lastMessages = [];
        for (let i = 0; i < users.length; i++) {
          const response = await fetch(
            `${GET_LAST_MESSAGE_TIME}/${users[i]._id}`,
            {
              credentials: "include",
            }
          );
          const result = await response.json();

          lastMessages.push({
            userId: users[i]._id,
            time: result.data.postedAt || "",
            content: result.data.content || "",
          });
        }
        setLastMessages(lastMessages);
      } catch (error) {
        console.log(error);
      }
    },
    [chat]
  );

  const getUnseenMessages = useCallback(
    async (users) => {
      try {
        if (!users) return;
        const unseenMessages = [];
        for (let i = 0; i < users.length; i++) {
          if (users[i]._id === chat?.selectedUser?._id) continue;

          const response = await fetch(
            `${GET_UNSEEN_MESSAGES}/${users[i]._id}`,
            {
              credentials: "include",
            }
          );

          const result = await response.json();

          if (result.data !== 0)
            unseenMessages.push({
              userId: users[i]._id,
              count: result.data,
            });
        }

        setUnseenMessages(unseenMessages);
      } catch (error) {
        console.log(error);
      }
    },
    [chat]
  );

  useEffect(() => {
    if (user && !getSocket()) connect(user._id);
  }, [user]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers, user]);

  useEffect(() => {
    if (!user) checkAuthentication();
  }, [checkAuthentication, user]);

  useEffect(() => {
    getLastMessageTime(users);
  }, [users, getLastMessageTime, chat]);

  useEffect(() => {
    getUnseenMessages(users);
  }, [getUnseenMessages, users]);

  return (
    <>
      <main className="bg-[#f5f7fb]">
        {(loadingUsers || navigation.state === "loading") && <Loader />}
        <Toaster />
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
                  <button
                    className="py-2 ml-auto mr-2"
                    onClick={() => navigate("/profile")}
                  >
                    <LuUserRound size="20px" color="rgb(148, 148, 156)" />
                  </button>
                </div>
                <ul className="flex flex-col">
                  {users ? (
                    users.length !== 0 ? (
                      users.map((user, i) => (
                        <li
                          className={`px-2 py-4 border-b border-b-slate-100 flex justify-between items-center cursor-pointer ${
                            user._id === selectedUser?._id ? "bg-slate-100" : ""
                          }`}
                          key={i}
                          onClick={() => {
                            if (location.pathname === `/chat/${user._id}`)
                              return;
                            setSelectedUser(user);
                            dispatch(selectUser(user));
                            navigate(`/chat/${user._id}`);
                          }}
                        >
                          <ProfileImage
                            imagePath={`http://127.0.0.1:8000/${user.profileImage}`}
                            // imagePath={`/${user.profileImage}`}
                            active={Object.keys(chat.onlineUsers).includes(
                              user._id
                            )}
                          />
                          <div className="w-[80%]">
                            <div className="w-full mb-1 flex justify-between items-center">
                              <span className="font-semibold">
                                {user.userName}
                              </span>
                              <span className="text-gray-400 text-xs font-semibold mr-1">
                                {formatTimeAgo(
                                  lastMessages.find(
                                    (message) => message.userId === user._id
                                  )?.time
                                )}
                              </span>
                            </div>
                            <div className="w-full flex justify-between items-center">
                              <p className="text-gray-400 text-xs">
                                {lastMessages.find(
                                  (message) => message.userId === user._id
                                )?.content.length >= 15
                                  ? lastMessages
                                      .find(
                                        (message) => message.userId === user._id
                                      )
                                      ?.content.slice(0, 14)
                                      .padEnd(18, ".")
                                  : lastMessages.find(
                                      (message) => message.userId === user._id
                                    )?.content}
                              </p>
                              {unseenMessages.some(
                                (message) => message.userId === user._id
                              ) && (
                                <div className="mr-4">
                                  <div className="w-[22px] h-[22px] rounded-full bg-green-400 flex items-center justify-center">
                                    <span className="text-white text-xs font-semibold">
                                      {
                                        unseenMessages.find(
                                          (message) =>
                                            message.userId === user._id
                                        ).count
                                      }
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="mt-56 text-center font-semibold text-base">
                        There is no user!
                      </p>
                    )
                  ) : (
                    <p className="mt-56 text-center font-semibold text-base">
                      Loading ...
                    </p>
                  )}
                </ul>
              </div>
            </section>
            <section className="w-[74%] inline-block bg-white rounded-lg overflow-hidden relative">
              <Outlet />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;
