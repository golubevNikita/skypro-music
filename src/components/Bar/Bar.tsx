'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';

import Progressbar from './Progressbar';

import { useAppSelector, useAppDispatch } from '@/store/store';
import {
  setIsNowPlaying,
  setNextTrack,
  setPreviousTrack,
  setIsShuffledPlayList,
  setCurrentTrack,
} from '@/store/features/trackSlice';

import { useLikeDislikeHook } from '@/hooks/useLikeDislikeHook';

import { timeProgerssInfo } from '@/services/utilities';

import styles from './bar.module.css';

export default function Bar() {
  const dispatch = useAppDispatch();

  const [isReady, setIsReady] = useState<boolean>(false);

  function onReadyMetadata() {
    if (audioRef.current) {
      setIsReady(true);
      audioRef.current.play();
      dispatch(setIsNowPlaying(true));
    }
  }

  const [volume, setVolume] = useState<number>(10);

  function volumeManipulation(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setVolume(Number(event.target.value));
  }

  const access = useAppSelector((state) => state.authentication.access);
  const { currentTrack, isNowPlaying, favoritePlayList } = useAppSelector(
    (state) => state.tracks,
  );

  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  function pauseUnpause() {
    if (isNowPlaying) {
      audioRef.current?.pause();
      dispatch(setIsNowPlaying(false));
    } else {
      audioRef.current?.play();
      dispatch(setIsNowPlaying(true));
    }
  }

  function nextTrack() {
    dispatch(setNextTrack());
  }

  function nextFavoriteTrack() {
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

  function previousTrack() {
    if (audioRef.current) {
      if (audioRef.current.currentTime < 4) {
        dispatch(setPreviousTrack());
      } else {
        audioRef.current.currentTime = 0;
      }
    }
  }

  const [isLoop, setIsLoop] = useState<boolean>(false);

  function loopTracks() {
    setIsLoop(!isLoop);
  }

  const isShuffledPlayList: boolean = useAppSelector((state) => {
    return state.tracks.isShuffledPlayList;
  });

  function shuffleTracks() {
    dispatch(setIsShuffledPlayList());
  }

  const { isLoading, errorMessage, toggleLike, isLike } =
    useLikeDislikeHook(currentTrack);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }

    setIsReady(false);
  }, [currentTrack, volume]);

  if (!currentTrack) {
    return <></>;
  }

  return (
    <div className={styles.bar}>
      {!isReady ? (
        <div className={styles.player__trackLoading}>Загрузка...</div>
      ) : (
        ''
      )}
      <audio
        ref={audioRef}
        src={currentTrack.track_file}
        loop={isLoop}
        onLoadedMetadata={onReadyMetadata}
        onEnded={() => {
          dispatch(setNextTrack());
        }}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
      ></audio>
      <div className={styles.bar__content}>
        <Progressbar
          max={audioRef.current?.duration || 0}
          value={currentTime}
          step={0.1}
          onChange={(event) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(event.target.value);
            }
          }}
          readOnly={!isReady}
        />

        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={previousTrack} className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>

              <div onClick={pauseUnpause} className={styles.player__btnPlay}>
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={`/img/icon/${isNowPlaying ? 'pause.svg' : 'sprite.svg#icon-play'}`}
                  ></use>
                </svg>
              </div>

              <div onClick={nextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                onClick={loopTracks}
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  className={classNames(styles.player__btnRepeatSvg, {
                    [styles.player__btnControlsActive]: isLoop,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div
                onClick={shuffleTracks}
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
              >
                <svg
                  className={classNames(styles.player__btnShuffleSvg, {
                    [styles.player__btnControlsActive]: isShuffledPlayList,
                  })}
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

              <div className={styles.trackPlay__likeDislike}>
                <svg
                  aria-disabled={isLoading}
                  className={classNames(styles.trackPlay__likeSvg, {
                    [styles.trackPlay__likeSvg_active]: isLike,
                    [styles.trackPlay__likeSvg_loading]: isLoading,
                  })}
                >
                  <use
                    onClick={(event) => {
                      if (!access) {
                        alert(errorMessage || 'Нет авторизации');
                      }

                      toggleLike(event);

                      if (isLike) {
                        nextFavoriteTrack();
                      }
                    }}
                    xlinkHref="/img/icon/sprite.svg#icon-like"
                  ></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__timeInfo}>
              {timeProgerssInfo(currentTime, audioRef.current?.duration)}
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress)}>
                <input
                  onChange={(event) => volumeManipulation(event)}
                  className={classNames(styles.volume__progressLine)}
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
