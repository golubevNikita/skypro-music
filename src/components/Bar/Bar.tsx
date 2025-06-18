'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { setIsNowPlaying } from '@/store/features/trackSlice';

import { trackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from './bar.module.css';

export default function Bar() {
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  });

  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack: trackItemInterface | null = useAppSelector((state) => {
    return state.tracks.currentTrack;
  });

  const isPlaying: boolean | null = useAppSelector((state) => {
    return state.tracks.isNowPlaying;
  });

  if (!currentTrack) {
    return <></>;
  }

  function pauseUnpause() {
    if (isPlaying) {
      audioRef.current?.pause();
      dispatch(setIsNowPlaying(false));
    } else {
      audioRef.current?.play();
      dispatch(setIsNowPlaying(true));
    }
  }

  function volumeManipulation(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    if (audioRef.current) {
      audioRef.current.volume = Number(event.target.value) / 100;
    }
  }

  function alertMessage() {
    alert('Еще не реализовано');
  }

  return (
    <div className={styles.bar}>
      <audio ref={audioRef} controls src={currentTrack.track_file}></audio>
      <div className={styles.bar__content}>
        <div className={styles.bar__playerProgress}></div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev}>
                <svg
                  onClick={alertMessage}
                  className={styles.player__btnPrevSvg}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={classNames(styles.player__btnPlay, styles.btn)}>
                <svg
                  onClick={pauseUnpause}
                  className={styles.player__btnPlaySvg}
                >
                  <use
                    xlinkHref={`/img/icon/${isPlaying ? 'pause.svg' : 'sprite.svg#icon-play'}`}
                  ></use>
                </svg>
              </div>
              <div className={styles.player__btnNext}>
                <svg
                  onClick={alertMessage}
                  className={styles.player__btnNextSvg}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  onClick={alertMessage}
                  className={styles.player__btnRepeatSvg}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
              >
                <svg
                  onClick={alertMessage}
                  className={styles.player__btnShuffleSvg}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  onChange={(event) => volumeManipulation(event)}
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
