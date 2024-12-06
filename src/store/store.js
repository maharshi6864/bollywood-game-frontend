import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./userDetails";
import friendsSlice from "./friendsStore";
import gameSlice from "./gameStore.js";

const store = configureStore({
  reducer: {
    userDetails: userDetailsSlice.reducer,
    friendsStore: friendsSlice.reducer,
    gameStore: gameSlice.reducer,
  },
});

export default store;
