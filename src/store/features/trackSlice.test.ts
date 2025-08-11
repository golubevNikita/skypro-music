import { initialStoreState } from '@/sharedInterfaces/sharedInterfaces';

import { trackSlice } from './trackSlice';

import { data } from '@/data';

describe('setFiltersApplication', () => {
  const storeState: initialStoreState = {
    currentTrack: null,
    isNowPlaying: false,
    isShuffledPlayList: false,

    currentPlayListName: 'Треки',

    currentPlayList: [],
    pagePlayList: data,
    filteredPlayList: [],
    favoritePlayList: [],
    shuffledPlayList: [],

    selectionSequence: [],

    filters: {
      authors: [],
      searchline: '',
      genres: [],
    },

    tracksSequence: [],

    tracksError: '',
  };

  it('фильтр треков отдельно по авторам', () => {
    const initialState = {
      ...storeState,

      filters: {
        authors: [data[0].author],
        searchline: '',
        genres: [],
      },
    };

    const newState = trackSlice.reducer(
      initialState,
      trackSlice.actions.setFiltersApplication(),
    );

    expect(newState.filteredPlayList).toStrictEqual([
      {
        _id: 8,
        name: 'Chase',
        author: 'Alexander Nakarada',
        release_date: '2005-06-11',
        genre: ['Классическая музыка'],
        duration_in_seconds: 205,
        album: 'Chase',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
        stared_user: [],
      },
    ]);
    expect(newState.tracksError).toBe('');
  });

  it('фильтр треков отдельно по жанрам', () => {
    const initialState = {
      ...storeState,

      filters: {
        authors: [],
        searchline: '',
        genres: ['Рок музыка'],
      },
    };

    const newState = trackSlice.reducer(
      initialState,
      trackSlice.actions.setFiltersApplication(),
    );

    expect(newState.filteredPlayList).toStrictEqual([
      {
        _id: 11,
        name: 'Secret Garden',
        author: 'Mixkit',
        release_date: '1972-06-06',
        genre: ['Рок музыка'],
        duration_in_seconds: 324,
        album: 'Secret Garden',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Mixkit_-_Secret_Garden.mp3',
        stared_user: [],
      },
      {
        _id: 12,
        name: 'A journey of successfull winners',
        author: '-',
        release_date: '1985-02-02',
        genre: ['Рок музыка'],
        duration_in_seconds: 255,
        album: '-',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_A_Journey_For_Successful_Winners.mp3',
        stared_user: [],
      },
    ]);
    expect(newState.tracksError).toBe('');
  });

  it('фильтр треков отдельно по поисковой строке', () => {
    const initialState = {
      ...storeState,

      filters: {
        authors: [],
        searchline: 'Secr',
        genres: [],
      },
    };

    const newState = trackSlice.reducer(
      initialState,
      trackSlice.actions.setFiltersApplication(),
    );

    expect(newState.filteredPlayList).toStrictEqual([
      {
        _id: 11,
        name: 'Secret Garden',
        author: 'Mixkit',
        release_date: '1972-06-06',
        genre: ['Рок музыка'],
        duration_in_seconds: 324,
        album: 'Secret Garden',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Mixkit_-_Secret_Garden.mp3',
        stared_user: [],
      },
    ]);
    expect(newState.tracksError).toBe('');
  });

  it('комбинация фильтров', () => {
    const initialState = {
      ...storeState,

      filters: {
        authors: ['-'],
        searchline: 'Tru',
        genres: ['Классическая музыка'],
      },
    };

    const newState = trackSlice.reducer(
      initialState,
      trackSlice.actions.setFiltersApplication(),
    );

    expect(newState.filteredPlayList).toStrictEqual([
      {
        _id: 15,
        name: 'True Summer',
        author: '-',
        release_date: '2012-06-01',
        genre: ['Классическая музыка'],
        duration_in_seconds: 253,
        album: 'True Summer',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Musiclfiles_-_True_Summer.mp3',
        stared_user: [],
      },
    ]);
    expect(newState.tracksError).toBe('');
  });

  it('Ошибка, возникающая при отсутствии треков, отвечающих условиям заданных фильтров', () => {
    const initialState = {
      ...storeState,

      filters: {
        authors: ['wasd'],
        searchline: 'qwerty',
        genres: ['Классическая музыка'],
      },
    };

    const newState = trackSlice.reducer(
      initialState,
      trackSlice.actions.setFiltersApplication(),
    );

    expect(newState.filteredPlayList).toStrictEqual([]);
    expect(newState.tracksError).toBe(
      'Нет треков, удовлетворяющих условиям поиска',
    );
  });
});

describe('setSortedPlayList', () => {
  const storeState: initialStoreState = {
    currentTrack: null,
    isNowPlaying: false,
    isShuffledPlayList: false,

    currentPlayListName: 'Треки',

    currentPlayList: [],
    pagePlayList: data,
    filteredPlayList: [],
    favoritePlayList: [],
    shuffledPlayList: [],

    selectionSequence: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],

    filters: {
      authors: [],
      searchline: '',
      genres: [],
    },

    tracksSequence: [],

    tracksError: '',
  };

  it('использует selectionSequence (последовательность по умолчанию) если tracksSequence пуст', () => {
    const initialState = {
      ...storeState,
    };

    const newState = trackSlice.reducer(
      initialState,
      trackSlice.actions.setSortedPlayList(),
    );

    expect(newState.filteredPlayList.map((trackItem) => trackItem._id)).toEqual(
      [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    );
  });

  it('устанавливает последовательность треков в плейлисте, если задан tracksSequence', () => {
    const initialState = {
      ...storeState,

      tracksSequence: [17, 16, 15, 14, 13, 12, 11, 10, 9, 8],
    };

    const newState = trackSlice.reducer(
      initialState,
      trackSlice.actions.setSortedPlayList(),
    );

    expect(newState.filteredPlayList.map((trackItem) => trackItem._id)).toEqual(
      [17, 16, 15, 14, 13, 12, 11, 10, 9, 8],
    );
  });

  it('задаёт последовательность tracksSequence отфильтрованному плейлисту (filteredPlayList)', () => {
    const initialState = {
      ...storeState,

      filteredPlayList: [data[0], data[1], data[2]],
      tracksSequence: [17, 16, 15, 14, 13, 12, 11, 10, 9, 8],
    };

    const newState = trackSlice.reducer(
      initialState,
      trackSlice.actions.setSortedPlayList(),
    );

    expect(newState.filteredPlayList).toStrictEqual([
      {
        _id: 10,
        name: 'Sneaky Snitch',
        author: 'Kevin Macleod',
        release_date: '2022-04-16',
        genre: ['Электронная музыка'],
        duration_in_seconds: 305,
        album: 'Sneaky Snitch',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3',
        stared_user: [],
      },
      {
        _id: 9,
        name: 'Open Sea epic',
        author: 'Frank Schroter',
        release_date: '2019-06-12',
        genre: ['Классическая музыка'],
        duration_in_seconds: 165,
        album: 'Open Sea epic',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3',
        stared_user: [],
      },
      {
        _id: 8,
        name: 'Chase',
        author: 'Alexander Nakarada',
        release_date: '2005-06-11',
        genre: ['Классическая музыка'],
        duration_in_seconds: 205,
        album: 'Chase',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
        stared_user: [],
      },
    ]);
  });
});
