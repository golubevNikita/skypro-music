'use client';

import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { formatTime } from '@/services/utilities';

import styles from '../centerblock.module.css';

interface TrackProps {
  key: number;
  name: string;
  author: string;
  album: string;
  duration: number;
}

export default function Track({
  key,
  name,
  author,
  album,
  duration,
}: TrackProps) {
  const [likeSong, setLikeSong] = useState<boolean>(false);

  function toLikeSong() {
    setLikeSong(!likeSong);
  }

  return (
    <div key={key} className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {name}
              <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {album}
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
          <span className={styles.track__timeText}>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
