import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

interface initialState {
  currentTrack: null | TrackItemInterface;
  // текущий трек

  isNowPlaying: boolean;
  // состояние проигрывания

  currentPlayList: TrackItemInterface[];
  // текущий плейлист, устанавливается как плейлист по умолчанию
  // при первом рендере, выборе какой-либо подборки или сброшенных фильтрах

  selectionSequence: number[];
  // порядок ID треков по умолчанию: устанавливается при API запросе треков и никак не фильтруется,
  // в дальнейшем используется для возврата порядка треков в исходную последовательность
  // при выборе пользователем соответствующего фильтра

  tracksSequence: number[];
  // порядок ID треков при установленных фильтрах, нужно для фильтрации треков,
  // а также для манипуляции их последовательностью

  filteredPlayList: null | TrackItemInterface[];
  // отфильтрованный плейлист: при каком-либо активном фильтре,
  // устанавливается как плейлист по умолчанию

  currentPlayListName: string;
  // текущее название подборки, отслеживается
  // для перерендера списка треков и сброса фильтров

  filters: {
    active: {
      authors: string[];
      genres: string[];
    };
    unique: {
      authors: string[];
      genres: string[];
    };
  };
  // сами фильтры, выбор пользователя записывается сюда
  // и дальше используются для фильтрации

  isShuffledPlayList: boolean;
  // состояние псевдорандомно перемешанного плейлиста

  shuffledPlayList: TrackItemInterface[];
  // псевдорандомно перемешанный плейлист, в зависимости от предыдущего свойства
  // устанавливается как плейлист по умолчанию
}

const initialState: initialState = {
  currentTrack: null,
  isNowPlaying: false,
  currentPlayList: [],
  selectionSequence: [],
  tracksSequence: [],
  filteredPlayList: null,
  currentPlayListName: 'Треки',

  filters: {
    active: {
      authors: [],
      genres: [],
    },
    unique: {
      authors: [],
      genres: [],
    },
  },

  isShuffledPlayList: false,
  shuffledPlayList: [],
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

    setCurrentPlayList: (
      state,
      action: PayloadAction<TrackItemInterface[]>,
    ) => {
      state.currentPlayList = action.payload;
      state.shuffledPlayList = state.currentPlayList.toSorted(
        () => Math.random() - 0.5,
      );
    },

    setSelectionSequence: (state, action: PayloadAction<number[]>) => {
      state.selectionSequence = action.payload;
    },

    setTracksSequence: (state, action: PayloadAction<number[]>) => {
      state.tracksSequence = action.payload;
    },

    setCurrentPlayListName: (state, action: PayloadAction<string>) => {
      state.currentPlayListName = action.payload;
    },

    setFilteredPlayList: (state) => {
      if (
        state.filters.active.authors.length === 0 &&
        state.filters.active.genres.length === 0 &&
        state.tracksSequence.length !== 0
      ) {
        state.filteredPlayList = state.currentPlayList.toSorted((a, b) => {
          const indexA = state.tracksSequence.indexOf(a._id);
          const indexB = state.tracksSequence.indexOf(b._id);
          return indexA - indexB;
        });

        state.shuffledPlayList = state.filteredPlayList.toSorted(
          () => Math.random() - 0.5,
        );
        return;
      }

      if (
        state.filters.active.authors.length !== 0 &&
        state.filters.active.genres.length !== 0
      ) {
        const preFilteredArray = state.currentPlayList.filter((track) => {
          return state.filters.active.authors.includes(track.author);
        });

        state.filteredPlayList = preFilteredArray.filter((track) => {
          const checkArray: boolean[] = [];
          for (const item of track.genre) {
            checkArray.push(state.filters.active.genres.includes(item));
          }

          return checkArray.includes(true);
        });

        state.shuffledPlayList = state.filteredPlayList.toSorted(
          () => Math.random() - 0.5,
        );
        return;
      }

      if (state.filters.active.authors.length !== 0) {
        state.filteredPlayList = state.currentPlayList.filter((track) => {
          return state.filters.active.authors.includes(track.author);
        });

        state.shuffledPlayList = state.filteredPlayList.toSorted(
          () => Math.random() - 0.5,
        );
        return;
      }

      if (state.filters.active.genres.length !== 0) {
        state.filteredPlayList = state.currentPlayList.filter((track) => {
          const checkArray: boolean[] = [];
          for (const item of track.genre) {
            checkArray.push(state.filters.active.genres.includes(item));
          }

          return checkArray.includes(true);
        });

        state.shuffledPlayList = state.filteredPlayList.toSorted(
          () => Math.random() - 0.5,
        );
        return;
      } else {
        state.filteredPlayList = null;
      }
    },

    setSortedPlayList: (state) => {
      const idFilters =
        state.filters.active.authors.length !== 0 ||
        state.filters.active.genres.length !== 0;

      if (idFilters) {
        if (
          state.tracksSequence.length !== 0 &&
          state.filteredPlayList !== null
        ) {
          state.filteredPlayList = state.filteredPlayList.toSorted((a, b) => {
            const indexA = state.tracksSequence.indexOf(a._id);
            const indexB = state.tracksSequence.indexOf(b._id);
            return indexA - indexB;
          });

          state.shuffledPlayList = state.filteredPlayList.toSorted(
            () => Math.random() - 0.5,
          );
          return;
        }

        if (
          state.tracksSequence.length === 0 &&
          state.filteredPlayList !== null
        ) {
          state.filteredPlayList = state.filteredPlayList.toSorted((a, b) => {
            const indexA = state.selectionSequence.indexOf(a._id);
            const indexB = state.selectionSequence.indexOf(b._id);
            return indexA - indexB;
          });

          state.shuffledPlayList = state.filteredPlayList.toSorted(
            () => Math.random() - 0.5,
          );
          return;
        }

        return;
      }

      if (!idFilters) {
        if (state.tracksSequence.length !== 0) {
          state.filteredPlayList = state.currentPlayList.toSorted((a, b) => {
            const indexA = state.tracksSequence.indexOf(a._id);
            const indexB = state.tracksSequence.indexOf(b._id);
            return indexA - indexB;
          });

          state.shuffledPlayList = state.filteredPlayList.toSorted(
            () => Math.random() - 0.5,
          );
          return;
        }

        if (state.tracksSequence.length === 0) {
          state.filteredPlayList = null;

          state.shuffledPlayList = state.currentPlayList.toSorted(
            () => Math.random() - 0.5,
          );
          return;
        }

        return;
      }
    },

    setUniqueFilters: (
      state,
      action: PayloadAction<{
        authors: string[];
        genres: string[];
      }>,
    ) => {
      state.filters.unique = action.payload;
    },

    setActiveAuthors: (state, action: PayloadAction<string[]>) => {
      state.filters.active.authors = action.payload;
    },

    setActiveGenres: (state, action: PayloadAction<string[]>) => {
      state.filters.active.genres = action.payload;
    },

    setIsShuffledPlayList: (state) => {
      state.isShuffledPlayList = !state.isShuffledPlayList;
    },

    setNextTrack: (state) => {
      let playList;

      if (state.filteredPlayList) {
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

        if (playList.length !== currentTrackIndex + 1) {
          state.currentTrack = playList[currentTrackIndex + 1];
        } else {
          state.currentTrack = playList[0];
        }
      }
    },

    setPreviousTrack: (state) => {
      let playList;

      if (state.filteredPlayList) {
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
  },
});

export const {
  setCurrentTrack,
  setIsNowPlaying,
  setCurrentPlayList,
  setSelectionSequence,
  setTracksSequence,
  setCurrentPlayListName,
  setFilteredPlayList,
  setSortedPlayList,
  setUniqueFilters,
  setActiveGenres,
  setActiveAuthors,
  setIsShuffledPlayList,
  setNextTrack,
  setPreviousTrack,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
