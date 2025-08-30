// const BASE_URL = "http://localhost:8000";
const BASE_URL = "";
const LOGIN = BASE_URL + "/user/login";
const SIGNUP = BASE_URL + "/user/signup";
const PROFILE = BASE_URL + "/user/profile";
const GET_ALL_USERS = BASE_URL + "/user/all";
const GET_ALL_CHATS = BASE_URL + "/chat/all";
const GET_LAST_MESSAGE_TIME = BASE_URL + "/chat/last";
const GET_UNSEEN_MESSAGES = BASE_URL + "/chat/unseen";
const SET_SEEN_MESSAGES = BASE_URL + "/chat/seen";
const SEND_MESSAGE = BASE_URL + "/chat/send";

export {
  LOGIN,
  SIGNUP,
  GET_ALL_CHATS,
  GET_ALL_USERS,
  PROFILE,
  SEND_MESSAGE,
  GET_LAST_MESSAGE_TIME,
  GET_UNSEEN_MESSAGES,
  SET_SEEN_MESSAGES,
};
