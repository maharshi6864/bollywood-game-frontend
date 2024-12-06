import {createSlice} from "@reduxjs/toolkit";

const friendsSlice = createSlice({
    name: "friends",
    initialState: {friendsList: []},
    reducers: {
        saveFriends: (state, action) => {
            state.friendsList = action.payload.friendsList;
        },
        addFriend: (state, action) => {
            state.friendsList.push(action.payload);
        },
        removeFriend: (state, action) => {
            state.friendsList = state.friendsList.filter(f => f.id !== action.payload.id);
        },
        changeOnlineStatus: (state, action) => {
            state.friendsList = state.friendsList.map(f => f.friendName === action.payload.username ? {
                ...f,
                status: action.payload.status
            } : f);
        }
    },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice;
