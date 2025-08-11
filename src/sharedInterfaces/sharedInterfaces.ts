export interface initialStoreState {
  currentTrack: null | TrackItemInterface;
  // текущий трек
  isNowPlaying: boolean;
  // состояние проигрывания
  isShuffledPlayList: boolean;
  // состояние псевдорандомно перемешанного плейлиста
  // при изменении на true мешает либо page pagePlayList либо filteredPlayList,
  // если последний содержит хотя бы один элемент

  currentPlayListName: string;
  // текущее название подборки, отслеживается
  // для перерендера списка треков и сброса фильтров

  currentPlayList: TrackItemInterface[];
  // все треки приложения. В дальнейшем на основе currentPlayList составляются разные подборки.
  // Устанавливается один раз при входе на сайт (обновлении страницы) и больше не меняется.
  pagePlayList: TrackItemInterface[];
  // плейлист конкретной страницы, меняется при смене url
  filteredPlayList: TrackItemInterface[];
  // отфильтрованный плейлист: устанавливается как плейлист по умолчанию
  // при каком-либо активном фильтре
  favoritePlayList: TrackItemInterface[];
  // плейлист понравившихся треков, меняется при
  // нажатии на сердечко либо возле трека, либо в проигрывателе
  shuffledPlayList: TrackItemInterface[];
  // псевдорандомно перемешанный плейлист, в зависимости от isShuffledPlayList
  // устанавливается как плейлист по умолчанию

  selectionSequence: number[];
  // порядок ID треков по умолчанию: устанавливается при изменении подборки (pagePlayList, favoritePlayList)
  // и никак не фильтруется, нужен для возврата порядка треков в исходную последовательность
  // при выборе пользователем соответствующего фильтра

  filters: {
    authors: string[];
    searchline: string;
    genres: string[];
  };
  // выбор пользователя записывается в эти фильтры,
  // используются для фильтрации

  tracksSequence: number[];
  // порядок ID треков при установленных фильтрах,
  // нужен для манипуляции последовательностью треков

  tracksError: string;
  // контейнер для ошибок
}

export interface SigninDataInterface {
  email: string;
  password: string;
}

export interface SigninPromiseInterface {
  email: string;
  username: string;
  _id: number;
}

export interface SignupDataInterface extends SigninDataInterface {
  username: string;
}

export interface SignupPromiseInterface {
  message: string;
  result: {
    username: string;
    email: string;
    _id: number;
  };
  success: boolean;
}

export interface TrackItemInterface {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: null;
  track_file: string;
  stared_user: [];
}

export interface TrackItemsPromiseInterface {
  success: boolean;
  data: TrackItemInterface[];
}

export interface SelectionData {
  _id: number;
  name: string;
  items: number[];
  owner: number[];
  __v: number;
}

export interface AllSelectionsPromiseInterface {
  success: boolean;
  data: SelectionData[];
}

export interface SelectionByIdPromiseInterface {
  success: boolean;
  data: SelectionData;
}
