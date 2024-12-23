import { configureStore } from "@reduxjs/toolkit";
import friendsSlice from "./friendsStore";
import gameSlice from "./gameStore.js";
import userSlice from "./userStore.js";

const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    friendsStore: friendsSlice.reducer,
    gameStore: gameSlice.reducer,
  },
});

export default store;
