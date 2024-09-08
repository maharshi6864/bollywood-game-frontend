import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { username: null, emailAddress: null, token: null },
  reducers: {
    saveUsername: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const userDetailsActions = userDetailsSlice.actions;

export default userDetailsSlice;
