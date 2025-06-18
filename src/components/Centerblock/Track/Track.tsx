'use client';

import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { formatTime } from '@/services/utilities';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsNowPlaying } from '@/store/features/trackSlice';

import { trackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from '../centerblock.module.css';

interface TrackProps {
  trackItem: trackItemInterface;
}

export default function Track({ trackItem }: TrackProps) {
  const [likeSong, setLikeSong] = useState<boolean>(false);

  const currentTrack: trackItemInterface | null = useAppSelector((state) => {
    return state.tracks.currentTrack;
  });

  const isPlaying: boolean | null = useAppSelector((state) => {
    return state.tracks.isNowPlaying;
  });

  const dispatch = useAppDispatch();

  function onClickSetTrack() {
    dispatch(setCurrentTrack(trackItem));
    dispatch(setIsNowPlaying(true));
  }

  function toLikeSong() {
    setLikeSong(!likeSong);
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
            {trackItem.album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg
            className={classNames(styles.track__timeSvg, {
              [styles.track__timeSvg_active]: likeSong === true,
            })}
          >
            <use
              onClick={toLikeSong}
              xlinkHref="/img/icon/sprite.svg#icon-like"
              style={{ cursor: 'pointer' }}
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
