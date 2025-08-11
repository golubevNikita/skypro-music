import classNames from 'classnames';

import { useAppDispatch } from '@/store/store';
import { setSortedPlayList } from '@/store/features/trackSlice';

import styles from '../popUps.module.css';

interface AuthorsProps {
  uniqueAuthors: string[];
  activeAuthorsState: string[];
  setStateFunction: ([]: string[]) => void;
  setChosenElements: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setStateFunction: ([]: string[]) => void,
    arrayState: string[],
  ) => void;
}

export default function Authors({
  uniqueAuthors,
  activeAuthorsState,
  setStateFunction,
  setChosenElements,
}: AuthorsProps) {
  const dispatch = useAppDispatch();

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
                setChosenElements(event, setStateFunction, activeAuthorsState);
                dispatch(setSortedPlayList());
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
