'use client';
import Link from 'next/link';
import classNames from 'classnames';
import { toast } from 'react-toastify';

import { formatTime } from '@/services/utilities';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack } from '@/store/features/trackSlice';

import { useLikeDislikeHook } from '@/hooks/useLikeDislikeHook';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from '../centerblock.module.css';

export default function Track({
  trackItem,
}: {
  trackItem: TrackItemInterface;
}) {
  const dispatch = useAppDispatch();

  const { isLoading, errorMessage, toggleLike, isLike } =
    useLikeDislikeHook(trackItem);

  const access = useAppSelector((state) => state.authentication.access);
  const { currentTrack, isNowPlaying, favoritePlayList } = useAppSelector(
    (state) => state.tracks,
  );

  function onClickSetTrack() {
    dispatch(setCurrentTrack(trackItem));
  }

  function nextTrack() {
    if (currentTrack) {
      const currentTrackIndex: number = favoritePlayList.findIndex(
        (el) => el._id === currentTrack._id,
      );

      if (favoritePlayList.length !== currentTrackIndex + 1) {
        dispatch(setCurrentTrack(favoritePlayList[currentTrackIndex + 1]));
      } else {
        dispatch(setCurrentTrack(favoritePlayList[0]));
      }
    }
  }

  return (
    <div onClick={onClickSetTrack} className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {currentTrack?._id === trackItem._id ? (
              <svg
                className={classNames(styles.track__activeTrackTitleSvg, {
                  [styles.track__playingActiveTrack]: isNowPlaying,
                })}
              >
                <use xlinkHref="/img/icon/active.svg"></use>
              </svg>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {trackItem.name}
              <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {trackItem.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {trackItem.album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg
            aria-disabled={isLoading}
            className={classNames(styles.track__timeSvg, {
              [styles.track__timeSvg_active]: isLike,
              [styles.track__timeSvg_loading]: isLoading,
            })}
          >
            <use
              onClick={(event) => {
                if (!access) {
                  toast.error(errorMessage || 'Нет авторизации');
                }

                toggleLike(event);

                if (isLike) {
                  nextTrack();
                }
              }}
              xlinkHref="/img/icon/sprite.svg#icon-like"
            ></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(trackItem.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
