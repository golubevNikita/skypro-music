'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AxiosError } from 'axios';
import classNames from 'classnames';

import { getSelectionById } from '@/services/tracksApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentPlayListName } from '@/store/features/trackSlice';

import Search from './Search/Search';
import Filter from '../Filter/Filter';

import styles from './centerblock.module.css';

export default function Centerblock({ trackList }: { trackList: ReactNode }) {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const currentPlayListName: string = useAppSelector((state) => {
    return state.tracks.currentPlayListName;
  });

  useEffect(() => {
    async function tracksCultivation() {
      try {
        if (params.id) {
          const selection = await getSelectionById(params.id);

          dispatch(setCurrentPlayListName(selection.data.name));
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage('Проверьте интернет-соединение и попробуйте позже');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
        }
      }
    }

    tracksCultivation();
  }, [params.id]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>
        {errorMessage ? errorMessage : currentPlayListName}
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
          {errorMessage ? <p>{errorMessage}</p> : trackList}
        </div>
      </div>
    </div>
  );
}
