import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
  name: "friends",
  initialState: { friendsList: [] },
  reducers: {
    saveFriends: (state, action) => {
      state.friendsList = action.payload.friendsList;
    },
  },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice;
