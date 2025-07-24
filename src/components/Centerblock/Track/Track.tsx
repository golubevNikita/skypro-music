'use client';

import classNames from 'classnames';

import Link from 'next/link';

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

  const currentTrack: TrackItemInterface | null = useAppSelector((state) => {
    return state.tracks.currentTrack;
  });

  const isPlaying: boolean | null = useAppSelector((state) => {
    return state.tracks.isNowPlaying;
  });

  function onClickSetTrack() {
    dispatch(setCurrentTrack(trackItem));
  }

  const favoriteTracks: TrackItemInterface[] = useAppSelector((state) => {
    return state.tracks.favoriteTracks;
  });

  function nextTrack() {
    if (currentTrack) {
      const currentTrackIndex: number = favoriteTracks.findIndex(
        (el) => el._id === currentTrack._id,
      );

      if (favoriteTracks.length !== currentTrackIndex + 1) {
        dispatch(setCurrentTrack(favoriteTracks[currentTrackIndex + 1]));
      } else {
        dispatch(setCurrentTrack(favoriteTracks[0]));
      }
    }
  }

  if (errorMessage) {
    console.log(errorMessage);
  }

  return (
    <div onClick={onClickSetTrack} className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {currentTrack?._id === trackItem._id ? (
              <svg
                className={classNames(styles.track__activeTrackTitleSvg, {
                  [styles.track__playingActiveTrack]: isPlaying,
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
            {errorMessage ? errorMessage : trackItem.album}
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
