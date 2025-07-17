'use client';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '@/store/store';

import {
  setTracksSequence,
  setSortedPlayList,
} from '@/store/features/trackSlice';

import { releaseDatesFilters } from '@/services/utilities';

import { TrackItemInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from '../popUps.module.css';

interface ReleaseDatesProps {
  activeFilterItem: string;
  chooseActiveElement: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

export default function ReleaseDates({
  activeFilterItem,
  chooseActiveElement,
}: ReleaseDatesProps) {
  const dispatch = useAppDispatch();

  const tracks: TrackItemInterface[] = useAppSelector((state) => {
    return state.tracks.currentPlayList;
  });

  function setSequence(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.textContent === 'Сначала старые') {
      const sortedArray = tracks.toSorted((a, b) => {
        return (
          Math.floor(Date.parse(a.release_date) / 1000) -
          Math.floor(Date.parse(b.release_date) / 1000)
        );
      });

      dispatch(setTracksSequence(sortedArray.map((track) => track._id)));
      dispatch(setSortedPlayList());
    }

    if (event.currentTarget.textContent === 'Сначала новые') {
      const sortedArray = tracks.toSorted((a, b) => {
        return (
          Math.floor(Date.parse(b.release_date) / 1000) -
          Math.floor(Date.parse(a.release_date) / 1000)
        );
      });

      dispatch(setTracksSequence(sortedArray.map((track) => track._id)));
      dispatch(setSortedPlayList());
    }

    if (event.currentTarget.textContent === 'По умолчанию') {
      dispatch(setTracksSequence([]));
      dispatch(setSortedPlayList());
    }

    if (event.currentTarget.textContent === activeFilterItem) {
      dispatch(setTracksSequence([]));
      dispatch(setSortedPlayList());
    }
  }

  return (
    <div className={styles.releaseDates__wrapper}>
      <div className={styles.releaseDates__container}>
        {releaseDatesFilters.map((filterItem, index) => {
          return (
            <p
              key={index}
              className={classNames(styles.releaseDates__filterItem, {
                [styles.releaseDates__filterItem_active]:
                  activeFilterItem === filterItem,
              })}
              onClick={(event) => {
                chooseActiveElement(event);
                setSequence(event);
              }}
            >
              {filterItem}
            </p>
          );
        })}
      </div>
    </div>
  );
}
