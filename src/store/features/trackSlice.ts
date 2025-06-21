import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { trackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

interface initialState {
  currentTrack: null | trackItemInterface;
  isNowPlaying: boolean;
  currentPlayList: trackItemInterface[];
  isShuffledPlayList: boolean;
  shuffledPlayList: trackItemInterface[];
}

const initialState: initialState = {
  currentTrack: null,
  isNowPlaying: false,
  currentPlayList: [],
  isShuffledPlayList: false,
  shuffledPlayList: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<trackItemInterface>) => {
      state.currentTrack = action.payload;
    },
    setIsNowPlaying: (state, action: PayloadAction<boolean>) => {
      state.isNowPlaying = action.payload;
    },
    setCurrentPlayList: (
      state,
      action: PayloadAction<trackItemInterface[]>,
    ) => {
      state.currentPlayList = action.payload;
      state.shuffledPlayList = state.currentPlayList.toSorted(
        () => Math.random() - 0.5,
      );
    },

    setIsShuffledPlayList: (state) => {
      state.isShuffledPlayList = !state.isShuffledPlayList;
    },

    setNextTrack: (state) => {
      const playList = state.isShuffledPlayList
        ? state.shuffledPlayList
        : state.currentPlayList;

      if (state.currentTrack) {
        const currentTrackIndex = playList.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );

        if (playList.length !== currentTrackIndex + 1) {
          state.currentTrack = playList[currentTrackIndex + 1];
        } else {
          state.currentTrack = playList[0];
        }
      }
    },

    setPreviousTrack: (state) => {
      const playList = state.isShuffledPlayList
        ? state.shuffledPlayList
        : state.currentPlayList;

      if (state.currentTrack) {
        const currentTrackIndex = playList.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );

        if (currentTrackIndex !== 0) {
          state.currentTrack = playList[currentTrackIndex - 1];
        } else {
          state.currentTrack = playList[0];
        }
      }
    },
  },
});

export const {
  setCurrentTrack,
  setIsNowPlaying,
  setCurrentPlayList,
  setNextTrack,
  setPreviousTrack,
  setIsShuffledPlayList,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
