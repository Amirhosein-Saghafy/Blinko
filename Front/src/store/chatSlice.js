import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedUser: null,
    onlineUsers: [],
    messages: [],
    newMessage: 0,
  },
  reducers: {
    selectUser(prevState, action) {
      prevState.selectedUser = action.payload;
      return prevState;
    },
    updateOnlineUsersList(prevState, action) {
      prevState.onlineUsers = action.payload;
      return prevState;
    },
    updateMessages(prevState, action) {
      prevState.messages = action.payload;
      return prevState;
    },
    setNewMessage(prevState) {
      prevState.newMessage = prevState.newMessage + 1;
      return prevState;
    },
  },
});

export const {
  selectUser,
  updateOnlineUsersList,
  updateMessages,
  setNewMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
