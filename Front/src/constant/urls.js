const BASE_URL = "http://localhost:8000";
const LOGIN = BASE_URL + "/user/login";
const SIGNUP = BASE_URL + "/user/signup";
const PROFILE = BASE_URL + "/user/profile";
const GET_ALL_USERS = BASE_URL + "/user/all";
const GET_ALL_CHATS = BASE_URL + "/chat/all";
const SEND_MESSAGE = BASE_URL + '/chat/send';

export { LOGIN, SIGNUP, GET_ALL_CHATS, GET_ALL_USERS, PROFILE, SEND_MESSAGE };
