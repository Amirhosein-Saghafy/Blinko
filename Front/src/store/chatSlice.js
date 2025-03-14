import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: null,
  reducers: {
    selectUser(prevState, action) {
      prevState = action.payload;
      return prevState;
    },
  },
});

export const { selectUser } = chatSlice.actions;
export default chatSlice.reducer;
