import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {},
  reducers: {
    saveUser: (state, action) => {
      // state = action.payload;
      // Mutate the existing state with the action payload properties
      return { ...state, ...action.payload };
    },changePlayerInGameStatus: (state, action) => {
      // state.inAGame = action.payload.inAGame;
      return { ...state, ...action.payload };
    }
  },
});

export const userDetailsActions = userDetailsSlice.actions;

export default userDetailsSlice;
