import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./userDetails";
import friendsSlice from "./friendsStore";

const store = configureStore({
  reducer: {
    userDetails: userDetailsSlice.reducer,
    friendsStore: friendsSlice.reducer,
  },
});

export default store;
