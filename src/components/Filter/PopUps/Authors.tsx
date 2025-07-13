'use client';
import classNames from 'classnames';

import { useAppSelector } from '@/store/store';

import styles from '../popUps.module.css';

interface AuthorsProps {
  activeAuthorsState: string[];
  setFunction: ([]: string[]) => void;
  setChosenElements: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setFunction: ([]: string[]) => void,
    arrayState: string[],
  ) => void;
}

export default function Authors({
  activeAuthorsState,
  setFunction,
  setChosenElements,
}: AuthorsProps) {
  const uniqueAuthors: string[] = useAppSelector((state) => {
    return state.tracks.filters.unique.authors;
  });

  return (
    <div className={styles.authors__wrapper}>
      <div className={styles.authors__container}>
        {uniqueAuthors.map((authorEl, index) => {
          return (
            <p
              key={index}
              className={classNames(styles.authors__filterItem, {
                [styles.authors__filterItem_active]:
                  activeAuthorsState.includes(authorEl),
              })}
              onClick={(event) => {
                setChosenElements(event, setFunction, activeAuthorsState);
              }}
            >
              {authorEl}
            </p>
          );
        })}
      </div>
    </div>
  );
}
