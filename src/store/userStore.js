import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {userDetails: null},
  reducers: {
    saveUser: (state, action) => {
      state.userDetails = action.payload;
    },changePlayerInGameStatus: (state, action) => {
      state.inAGame = action.payload.inAGame;
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice;
