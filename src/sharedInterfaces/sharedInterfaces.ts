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
