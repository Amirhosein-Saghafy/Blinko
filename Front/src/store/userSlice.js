import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (prevState, action) => {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login:loginUser } = userSlice.actions;
