import { ReactNode, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import classNames from 'classnames';

import Search from './Search/Search';
import Filter from '../Filter/Filter';

import { getAllTracks, getAllFavoriteTracks } from '@/services/tracksApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlayList,
  setFavoritePlayList,
  setTracksError,
} from '@/store/features/trackSlice';

import { reAuthentication } from '@/services/reAuthentication';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from './centerblock.module.css';

export default function Centerblock({ trackList }: { trackList: ReactNode }) {
  const dispatch = useAppDispatch();
  const { access, refresh } = useAppSelector((state) => state.authentication);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    currentPlayList,
    favoritePlayList,
    currentPlayListName,
    tracksError,
  } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    async function initialTracksState() {
      if (!currentPlayList.length) {
        try {
          const allTracks = await getAllTracks();

          dispatch(setCurrentPlayList(allTracks.data));
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error);
            if (error.response) {
              setErrorMessage(error.response.data.message);
              dispatch(setTracksError('Упс, что-то пошло не так'));
            } else if (error.request) {
              setErrorMessage(
                'Проверьте интернет-соединение и попробуйте позже',
              );
            } else {
              setErrorMessage('Неизвестная ошибка');
            }
          }
        }
      }
    }
    initialTracksState();
  }, []);

  useEffect(() => {
    async function initialTracksState() {
      if (access && !favoritePlayList.length) {
        reAuthentication(
          (newToken) => getAllFavoriteTracks(newToken || access),
          refresh,
          dispatch,
        )
          .then((response) => {
            const favoriteSelectionTrackIds = response.data.map(
              (item) => item._id,
            );

            const currentSelection: TrackItemInterface[] =
              currentPlayList.filter((track) =>
                favoriteSelectionTrackIds.includes(track._id),
              );

            dispatch(setFavoritePlayList(currentSelection));
          })
          .catch((error) => {
            if (error instanceof AxiosError) {
              console.log(error);
              if (error.response) {
                setErrorMessage(error.response.data.message);
                dispatch(setTracksError('Упс, что-то пошло не так'));
              } else if (error.request) {
                setErrorMessage(
                  'Проверьте интернет-соединение и попробуйте позже',
                );
              } else {
                setErrorMessage('Неизвестная ошибка');
              }
            }
          });
      }
    }

    initialTracksState();
  }, [currentPlayList]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>
        {currentPlayListName || 'Треки'}
      </h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <Filter />
      </div>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {tracksError || errorMessage ? (
            <p>
              {tracksError}
              <br />
              {errorMessage}
            </p>
          ) : (
            trackList
          )}
        </div>
      </div>
    </div>
  );
}
