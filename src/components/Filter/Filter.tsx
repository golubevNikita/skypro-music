'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames';

import Authors from './PopUps/Authors';
import ReleaseDates from './PopUps/ReleaseDates';
import Genres from './PopUps/Genres';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setActiveGenres,
  setActiveAuthors,
  setFilteredPlayList,
  setTracksSequence,
} from '@/store/features/trackSlice';

import styles from './popUps.module.css';

export default function Filter() {
  const [authorsPopUp, setAuthorsPopUp] = useState<boolean>(false);
  const [releaseDatesPopUp, setReleaseDatesPopUp] = useState<boolean>(false);
  const [genresPopUp, setGenresPopUp] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [activeAuthorsState, setActiveAuthorsState] = useState<string[]>([]);
  const [activeGenresState, setActiveGenresState] = useState<string[]>([]);

  const currentPlayListName: string = useAppSelector((state) => {
    return state.tracks.currentPlayListName;
  });

  function popUpsCloseOpen(
    popUp: boolean,
    setFunction: (value: React.SetStateAction<boolean>) => void,
  ) {
    setAuthorsPopUp(false);
    setReleaseDatesPopUp(false);
    setGenresPopUp(false);

    if (activeAuthorsState.length !== 0) {
      dispatch(setActiveAuthors(activeAuthorsState));
    }

    if (activeGenresState.length !== 0) {
      dispatch(setActiveGenres(activeGenresState));
    }

    setFunction(!popUp);
  }

  function allPopUpsClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();

    setAuthorsPopUp(false);
    setReleaseDatesPopUp(false);
    setGenresPopUp(false);
  }

  const uniqueAuthors: string[] = useAppSelector((state) => {
    return state.tracks.filters.unique.authors;
  });

  function setChosenElements(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setFunction: ([]: string[]) => void,
    arrayState: string[],
  ): void {
    event.preventDefault();
    event.stopPropagation();

    const selectedFilter = event.currentTarget.textContent;

    if (selectedFilter === arrayState.toString()) {
      // Проверка, когда выбранный элемент уже есть в массиве, при этом массив содержит всего один элемент
      setFunction([]);
      dispatch(
        uniqueAuthors.find((el) => el === selectedFilter)
          ? setActiveAuthors([])
          : setActiveGenres([]),
      );
      dispatch(setFilteredPlayList());
      return;
    }

    // Проверка на тип "строка"
    if (selectedFilter) {
      // Проверка, когда выбранный элемент уже есть в массиве, при этом массив содержит больше одного элемента
      if (arrayState.toString().includes(selectedFilter)) {
        const removeItem = arrayState.reduce(
          (newArray: string[], el: string): string[] => {
            if (el !== selectedFilter) {
              newArray.push(el);
            }

            return newArray;
          },
          [],
        );

        setFunction(removeItem);
        dispatch(
          uniqueAuthors.find((el) => el === selectedFilter)
            ? setActiveAuthors(removeItem)
            : setActiveGenres(removeItem),
        );

        dispatch(setFilteredPlayList());
        return;

        // Действие, если выбранного элемента нет в массиве
      } else {
        setFunction([...arrayState, selectedFilter]);

        dispatch(
          uniqueAuthors.find((el) => el === selectedFilter)
            ? setActiveAuthors([...arrayState, selectedFilter])
            : setActiveGenres([...arrayState, selectedFilter]),
        );

        dispatch(setFilteredPlayList());
        return;
      }
    }
  }

  const [activeFilterItem, setActiveFilterItem] = useState<string>('');

  function chooseActiveElement(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.textContent === activeFilterItem) {
      setActiveFilterItem('');
      dispatch(setTracksSequence([]));
      return;
    }
    if (event.currentTarget.textContent) {
      setActiveFilterItem(event.currentTarget.textContent);
      return;
    }
  }

  useEffect(() => {
    setActiveAuthorsState([]);
  }, [currentPlayListName]);

  return (
    <>
      {authorsPopUp || releaseDatesPopUp || genresPopUp ? (
        <div
          className={styles.closePopUpListener}
          onClick={(event) => {
            allPopUpsClose(event);
          }}
        ></div>
      ) : (
        ''
      )}

      <div
        className={classNames(styles.filter__button, {
          [styles.filter__button_active]: activeAuthorsState.length !== 0,
        })}
        onClick={() => {
          popUpsCloseOpen(authorsPopUp, setAuthorsPopUp);
        }}
      >
        {activeAuthorsState.length !== 0 ? (
          <div className={styles.authors__notation}>
            <div className={styles.authors__notation_content}>
              {activeAuthorsState.length}
            </div>
          </div>
        ) : (
          ''
        )}
        исполнителю
        {authorsPopUp ? (
          <Authors
            activeAuthorsState={activeAuthorsState}
            setFunction={setActiveAuthorsState}
            setChosenElements={setChosenElements}
          />
        ) : (
          ''
        )}
      </div>

      <div
        className={classNames(styles.filter__button, {
          [styles.filter__button_active]: activeFilterItem !== '',
        })}
        onClick={() => {
          popUpsCloseOpen(releaseDatesPopUp, setReleaseDatesPopUp);
        }}
      >
        {activeFilterItem ? (
          <div className={styles.filter__notation}>
            <div className={styles.filter__notation_content}></div>
          </div>
        ) : (
          ''
        )}
        году выпуска
        {releaseDatesPopUp ? (
          <ReleaseDates
            activeFilterItem={activeFilterItem}
            chooseActiveElement={chooseActiveElement}
          />
        ) : (
          ''
        )}
      </div>

      <div
        className={classNames(styles.filter__button, {
          [styles.filter__button_active]: activeGenresState.length !== 0,
        })}
        onClick={() => {
          popUpsCloseOpen(genresPopUp, setGenresPopUp);
        }}
      >
        {activeGenresState.length !== 0 ? (
          <div className={styles.genres__notation}>
            <div className={styles.genres__notation_content}>
              {activeGenresState.length}
            </div>
          </div>
        ) : (
          ''
        )}
        жанру
        {genresPopUp ? (
          <Genres
            activeGenresState={activeGenresState}
            setFunction={setActiveGenresState}
            setChosenElements={setChosenElements}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
}
