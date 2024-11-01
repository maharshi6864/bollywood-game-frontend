import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {},
  reducers: {
    saveUsername: (state, action) => {
      state = action.payload;
      console.log(state)
    },
  },
});

export const userDetailsActions = userDetailsSlice.actions;

export default userDetailsSlice;
