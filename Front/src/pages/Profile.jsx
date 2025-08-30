import React, { useActionState, useEffect } from "react";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { IoLockClosedOutline } from "react-icons/io5";
import Loader from "../ui/Loader";
import { PROFILE } from "../constant/urls";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import { useNavigate } from "react-router";

const formSubmitter = async function (prevState, form) {
  const userName = form.get("userName");
  const password = form.get("password");
  const profileImage = form.get("profile-image");

  const formData = new FormData();

  formData.append("userName", userName);
  formData.append("password", password);
  formData.append("profile-image", profileImage);

  const response = await fetch(PROFILE, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const result = await response.json();

  if (response.status === 200) {
    toast.success(result.message);
    return result.data;
  } else toast.error(result.error);
};

function Profile() {
  const [state, formAction, isPending] = useActionState(formSubmitter, null);
  const user = useSelector((state) => state.user);
  const profileImageRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeProfileImage = (e) => {
    if (e.target.files.length === 0) {
      profileImageRef.current.setAttribute(
        "src",
        "http://localhost:8000/profile-default.png"
      );
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      profileImageRef.current.setAttribute("src", e.target.result);
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (state) {
      dispatch(loginUser(state));
    }
  }, [state, dispatch]);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return (
    <React.Fragment>
      {isPending && <Loader />}
      <Toaster />
      <div className="h-[calc(100vh-40px)]">
        <div className="flex flex-col items-center justify-center py-16">
          <h3 className="font-semibold text-lg mb-3">Profile</h3>
          <h5 className="text-base">Your profile information</h5>
          <form action={formAction} className="mt-5 flex flex-col items-center">
            <div className="relative w-20 h-20 mb-3">
              <img
                src={`http://localhost:8000/${user?.profileImage}`}
                alt="profile"
                ref={profileImageRef}
                className="border-2 border-white rounded-full mb-3 w-full h-full object-cover"
              />
              <input
                type="file"
                name="profile-image"
                id="profile-image"
                className="hidden"
                onChange={changeProfileImage}
              />
              <label
                htmlFor="profile-image"
                className="absolute w-6 h-6 flex justify-center items-center bg-yellow-600 rounded-full right-1 bottom-2 cursor-pointer"
              >
                <FaCamera size="14px" color="white" />
              </label>
            </div>
            <span className="text-xs">
              Click the camera icon to update your photo
            </span>
            <div className="flex flex-col w-[350px] mt-10">
              <div className="flex items-center mb-[6px]">
                <GoPerson />
                <label htmlFor="userName" className="text-xs ml-[6px]">
                  User Name
                </label>
              </div>
              <input
                type="text"
                id="userName"
                name="userName"
                defaultValue={user?.userName}
                className="border-2 border-yellow-600 rounded-md text-sm outline-none px-2 py-1"
              />
            </div>
            <div className="flex flex-col w-[350px] mt-5">
              <div className="flex items-center mb-[6px]">
                <IoLockClosedOutline />
                <label htmlFor="password" className="text-xs ml-[6px]">
                  Password
                </label>
              </div>
              <input
                type="text"
                id="password"
                name="password"
                className="border-2 border-yellow-600 rounded-md text-sm outline-none px-2 py-1"
              />
            </div>
            <div className="flex justify-end w-full mt-10">
              <input
                type="submit"
                value="Save"
                className="bg-yellow-600 text-white px-7 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-yellow-700 transition-all duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
