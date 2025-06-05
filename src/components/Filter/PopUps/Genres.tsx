'use client';
import classNames from 'classnames';

import styles from '../popUps.module.css';

interface GenresProps {
  uniqueGenres: string[];
  activeGenresItems: string[];
  setChosenElements: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setFunction: ([]: string[]) => void,
    arrayState: string[],
  ) => void;
  setFunction: ([]: string[]) => void;
  arrayState: string[];
}

export default function Genres({
  uniqueGenres,
  activeGenresItems,
  setChosenElements,
  setFunction,
  arrayState,
}: GenresProps) {
  return (
    <div className={styles.genres__wrapper}>
      <div className={styles.genres__container}>
        {uniqueGenres.map((genreEl, index) => {
          return (
            <p
              key={index}
              className={classNames(styles.genres__filterItem, {
                [styles.genres__filterItem_active]:
                  activeGenresItems.includes(genreEl),
              })}
              onClick={(event) => {
                setChosenElements(event, setFunction, arrayState);
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
