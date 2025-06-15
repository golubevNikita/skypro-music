import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { trackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

interface initialState {
  currentTrack: null | trackItemInterface;
  isNowPlaying: boolean;
}

const initialState: initialState = {
  currentTrack: null,
  isNowPlaying: false,
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
  },
});

export const { setCurrentTrack, setIsNowPlaying } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
