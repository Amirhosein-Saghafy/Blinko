import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedUser: null,
    onlineUsers: [],
  },
  reducers: {
    selectUser(prevState, action) {
      prevState.selectedUser = action.payload;
      return prevState;
    },
  },
});

export const { selectUser } = chatSlice.actions;
export default chatSlice.reducer;
