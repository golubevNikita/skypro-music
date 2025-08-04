import classNames from 'classnames';

import { useAppDispatch } from '@/store/store';
import { setSortedPlayList } from '@/store/features/trackSlice';

import styles from '../popUps.module.css';

interface GenresProps {
  uniqueGenres: string[];
  activeGenresState: string[];
  setStateFunction: ([]: string[]) => void;
  setChosenElements: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setStateFunction: ([]: string[]) => void,
    arrayState: string[],
  ) => void;
}

export default function Genres({
  uniqueGenres,
  activeGenresState,
  setStateFunction,
  setChosenElements,
}: GenresProps) {
  const dispatch = useAppDispatch();

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
                setChosenElements(event, setStateFunction, activeGenresState);
                dispatch(setSortedPlayList());
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
