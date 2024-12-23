import {createSlice} from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {gameDetails: null},
    reducers: {
        saveGameDetails: (state, action) => {
            state.gameDetails = action.payload;
        },
        deleteGameDetails: (state, action) => {
            state.gameDetails = null;
        },
        updatePlayerStatus: (state, action) => {
            const {playerName, status} = action.payload;

            // Ensure gameDetails and inGamePlayerDtoList exist
            if (state.gameDetails && state.gameDetails.inGamePlayerDtoList) {
                state.gameDetails.inGamePlayerDtoList = state.gameDetails.inGamePlayerDtoList.map(player =>
                    player.playerName === playerName ? {...player, status: status} : player
                );
            }
        },
        updatePlayerAskingGuessingStatus: (state, action) => {
            const {playerName, status} = action.payload;

            // Ensure gameDetails and inGamePlayerDtoList exist
            if (state.gameDetails && state.gameDetails.inGamePlayerDtoList) {
                state.gameDetails.inGamePlayerDtoList = state.gameDetails.inGamePlayerDtoList.map(player =>
                    player.playerName === playerName ? {...player, askingGuessingStatus: status} : player
                );
            }
        },
        updateMovieName:(state, action) => {
            const {movieName,timeStamp} = action.payload;
            state.gameDetails.movieName = movieName;
            state.gameDetails.roundTimeOut = timeStamp;
        }


    },
});

export const gameActions = gameSlice.actions;

export default gameSlice;
