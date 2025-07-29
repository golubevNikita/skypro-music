import { useState } from 'react';
import { AxiosError } from 'axios';

import { useAppDispatch, useAppSelector } from '@/store/store';

import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';

import { reAuthentication } from '@/services/reAuthentication';

import { addLike, removeLike } from '@/services/tracksApi';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

interface LikeDislikeHookInterface {
  isLoading: boolean;
  errorMessage: string | null;
  toggleLike: (event: React.MouseEvent<SVGUseElement, MouseEvent>) => void;
  isLike: boolean;
}

export const useLikeDislikeHook = (
  track: TrackItemInterface | null,
): LikeDislikeHookInterface => {
  const favoritePlayList = useAppSelector(
    (state) => state.tracks.favoritePlayList,
  );
  const { access, refresh } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  const isLike = favoritePlayList.some((item) => item._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleLike = (event: React.MouseEvent<SVGUseElement, MouseEvent>) => {
    event.stopPropagation();

    if (!access) {
      return setErrorMessage('Нет авторизации');
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMessage(null);
    if (track) {
      reAuthentication(
        (newToken) => actionApi(newToken || access, track._id),
        refresh,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorMessage(error.response.data.message);
            } else if (error.request) {
              setErrorMessage('Произошла ошибка. Попробуйте позже');
            } else {
              setErrorMessage('Неизвестная ошибка');
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return {
    isLoading,
    errorMessage,
    toggleLike,
    isLike,
  };
};
