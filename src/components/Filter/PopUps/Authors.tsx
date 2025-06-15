'use client';
import classNames from 'classnames';

import styles from '../popUps.module.css';

interface AuthorsProps {
  uniqueAuthors: string[];
  activeAuthorsItems: string[];
  setChosenElements: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setFunction: ([]: string[]) => void,
    arrayState: string[],
  ) => void;
  setFunction: ([]: string[]) => void;
  arrayState: string[];
}

export default function Authors({
  uniqueAuthors,
  activeAuthorsItems,
  setChosenElements,
  setFunction,
  arrayState,
}: AuthorsProps) {
  return (
    <div className={styles.authors__wrapper}>
      <div className={styles.authors__container}>
        {uniqueAuthors.map((authorEl, index) => {
          return (
            <p
              key={index}
              className={classNames(styles.authors__filterItem, {
                [styles.authors__filterItem_active]:
                  activeAuthorsItems.includes(authorEl),
              })}
              onClick={(event) => {
                setChosenElements(event, setFunction, arrayState);
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
