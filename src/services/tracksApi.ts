import axios from 'axios';

import {
  TrackItemsPromiseInterface,
  AllSelectionsPromiseInterface,
  SelectionByIdPromiseInterface,
} from '@/sharedInterfaces/sharedInterfaces';

const URL_TRACKS = 'https://webdev-music-003b5b991590.herokuapp.com';

export function getAllTracks(): Promise<TrackItemsPromiseInterface> {
  return axios(URL_TRACKS + '/catalog/track/all/').then((response) => {
    return response.data;
  });
}

export function getAllSelections(): Promise<AllSelectionsPromiseInterface> {
  return axios(URL_TRACKS + '/catalog/selection/all').then((response) => {
    return response.data;
  });
}

export function getSelectionById(
  id: string,
): Promise<SelectionByIdPromiseInterface> {
  return axios(URL_TRACKS + `/catalog/selection/${id}/`).then((response) => {
    return response.data;
  });
}
