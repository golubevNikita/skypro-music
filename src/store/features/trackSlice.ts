import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  initialStoreState,
  TrackItemInterface,
} from '@/sharedInterfaces/sharedInterfaces';

const initialState: initialStoreState = {
  currentTrack: null,
  isNowPlaying: false,
  isShuffledPlayList: false,

  currentPlayListName: 'Треки',

  currentPlayList: [],
  pagePlayList: [],
  filteredPlayList: [],
  favoritePlayList: [],
  shuffledPlayList: [],

  selectionSequence: [],

  filters: {
    authors: [],
    sequence: '',
    genres: [],
  },

  tracksSequence: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackItemInterface>) => {
      state.currentTrack = action.payload;
    },
    setIsNowPlaying: (state, action: PayloadAction<boolean>) => {
      state.isNowPlaying = action.payload;
    },
    setIsShuffledPlayList: (state) => {
      state.isShuffledPlayList = !state.isShuffledPlayList;
      state.shuffledPlayList = state.filteredPlayList.length
        ? state.filteredPlayList.toSorted(() => Math.random() - 0.5)
        : state.pagePlayList.toSorted(() => Math.random() - 0.5);
    },

    setCurrentPlayListName: (state, action: PayloadAction<string>) => {
      state.currentPlayListName = action.payload;
    },

    setCurrentPlayList: (
      state,
      action: PayloadAction<TrackItemInterface[]>,
    ) => {
      state.currentPlayList = action.payload;
    },
    setPagePlayList: (state, action: PayloadAction<TrackItemInterface[]>) => {
      state.pagePlayList = action.payload;
    },
    setFilteredPlayList: (
      state,
      action: PayloadAction<TrackItemInterface[]>,
    ) => {
      state.filteredPlayList = action.payload;
    },
    setFavoritePlayList: (
      state,
      action: PayloadAction<TrackItemInterface[]>,
    ) => {
      state.favoritePlayList = action.payload;
    },

    setSelectionSequence: (state, action: PayloadAction<number[]>) => {
      state.selectionSequence = action.payload;
    },

    setFiltersApplication: (state) => {
      let filteredPlayList = state.pagePlayList;

      if (state.filters.authors.length) {
        filteredPlayList = filteredPlayList.filter((track) => {
          return state.filters.authors.includes(track.author);
        });
      }

      if (state.filters.genres.length) {
        filteredPlayList = filteredPlayList.filter((track) => {
          return state.filters.genres.some((item) =>
            track.genre.includes(item),
          );
        });
      }

      if (filteredPlayList.length !== state.pagePlayList.length) {
        state.filteredPlayList = filteredPlayList;
      } else {
        state.filteredPlayList = [];
      }
    },

    setTracksSequence: (state, action: PayloadAction<number[]>) => {
      state.tracksSequence = action.payload;
    },

    setNextTrack: (state) => {
      let playList;

      if (state.filteredPlayList.length) {
        playList = state.isShuffledPlayList
          ? state.shuffledPlayList
          : state.filteredPlayList;
      } else {
        playList = state.isShuffledPlayList
          ? state.shuffledPlayList
          : state.pagePlayList;
      }

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
      let playList;

      if (state.filteredPlayList.length) {
        playList = state.isShuffledPlayList
          ? state.shuffledPlayList
          : state.filteredPlayList;
      } else {
        playList = state.isShuffledPlayList
          ? state.shuffledPlayList
          : state.currentPlayList;
      }

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

    setActiveAuthors: (state, action: PayloadAction<string[]>) => {
      state.filters.authors = action.payload;
    },
    setActiveGenres: (state, action: PayloadAction<string[]>) => {
      state.filters.genres = action.payload;
    },

    setSortedPlayList: (state) => {
      const currentPlayList = state.filteredPlayList.length
        ? state.filteredPlayList
        : state.pagePlayList;

      const currentSequence = state.tracksSequence.length
        ? state.tracksSequence
        : state.selectionSequence;

      state.filteredPlayList = currentPlayList.toSorted((a, b) => {
        const indexA = currentSequence.indexOf(a._id);
        const indexB = currentSequence.indexOf(b._id);
        return indexA - indexB;
      });
    },

    addLikedTracks: (state, action: PayloadAction<TrackItemInterface>) => {
      state.favoritePlayList = [...state.favoritePlayList, action.payload];
    },
    removeLikedTracks: (state, action: PayloadAction<TrackItemInterface>) => {
      const newFavoritePlayList = state.favoritePlayList.filter(
        (item) => item._id !== action.payload._id,
      );

      state.favoritePlayList = newFavoritePlayList;
    },
  },
});

export const {
  setCurrentTrack,
  setIsNowPlaying,
  setIsShuffledPlayList,

  setCurrentPlayListName,

  setCurrentPlayList,
  setPagePlayList,
  setFilteredPlayList,
  setFavoritePlayList,

  setSelectionSequence,

  setFiltersApplication,

  setTracksSequence,

  setNextTrack,
  setPreviousTrack,

  setActiveGenres,
  setActiveAuthors,

  setSortedPlayList,

  addLikedTracks,
  removeLikedTracks,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
