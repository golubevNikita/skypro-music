'use client';
import classNames from 'classnames';

import { useAppSelector } from '@/store/store';

import styles from '../popUps.module.css';

interface GenresProps {
  activeGenresState: string[];
  setFunction: ([]: string[]) => void;
  setChosenElements: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setFunction: ([]: string[]) => void,
    arrayState: string[],
  ) => void;
}

export default function Genres({
  activeGenresState,
  setFunction,
  setChosenElements,
}: GenresProps) {
  const uniqueGenres: string[] = useAppSelector((state) => {
    return state.tracks.filters.unique.genres;
  });

  return (
    <div className={styles.genres__wrapper}>
      <div className={styles.genres__container}>
        {uniqueGenres.map((genreEl, index) => {
          return (
            <p
              key={index}
              className={classNames(styles.genres__filterItem, {
                [styles.genres__filterItem_active]:
                  activeGenresState.includes(genreEl),
              })}
              onClick={(event) => {
                setChosenElements(event, setFunction, activeGenresState);
              }}
            >
              {genreEl}
            </p>
          );
        })}
      </div>
    </div>
  );
}
