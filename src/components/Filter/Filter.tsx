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
  setTracksSequence,
  setFiltersApplication,
} from '@/store/features/trackSlice';

import { getUniqueValuesByKey } from '@/services/utilities';

import styles from './popUps.module.css';

export default function Filter() {
  const dispatch = useAppDispatch();

  const [authorsPopUp, setAuthorsPopUp] = useState<boolean>(false);
  const [releaseDatesPopUp, setReleaseDatesPopUp] = useState<boolean>(false);
  const [genresPopUp, setGenresPopUp] = useState<boolean>(false);

  const [activeAuthorsState, setActiveAuthorsState] = useState<string[]>([]);
  const [chosenSequence, setChosenSequence] = useState<string>('');
  const [activeGenresState, setActiveGenresState] = useState<string[]>([]);

  const { currentPlayListName, pagePlayList } = useAppSelector(
    (state) => state.tracks,
  );

  const uniqueAuthors: string[] = getUniqueValuesByKey(pagePlayList, 'author');
  const uniqueGenres: string[] = getUniqueValuesByKey(pagePlayList, 'genre');

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

  // Функция установки активных фильтров (несколько элементов)
  function setChosenElements(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setStateFunction: ([]: string[]) => void,
    arrayState: string[],
  ): void {
    event.preventDefault();
    event.stopPropagation();

    // Определяем, какую функцию будем использовать
    const selectedFilter = event.currentTarget.textContent;
    const actionFunction = uniqueAuthors.find((el) => el === selectedFilter)
      ? setActiveAuthors
      : setActiveGenres;

    // Проверка, когда выбранный элемент уже есть в массиве, при этом массив содержит всего один элемент
    if (selectedFilter === arrayState.toString()) {
      setStateFunction([]);

      dispatch(actionFunction([]));
      dispatch(setFiltersApplication());
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

        setStateFunction(removeItem);
        dispatch(actionFunction(removeItem));

        dispatch(setFiltersApplication());
        return;

        // Действие, если выбранного элемента нет в массиве
      } else {
        setStateFunction([...arrayState, selectedFilter]);
        dispatch(actionFunction([...arrayState, selectedFilter]));

        dispatch(setFiltersApplication());
        return;
      }
    }
  }

  // Функция установки активных фильтров (один элемент)
  function chooseSequence(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.textContent === chosenSequence) {
      setChosenSequence('');
      dispatch(setTracksSequence([]));
      return;
    }
    if (event.currentTarget.textContent) {
      setChosenSequence(event.currentTarget.textContent);
      return;
    }
  }

  useEffect(() => {
    setActiveAuthorsState([]);
    setActiveGenresState([]);
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
            uniqueAuthors={uniqueAuthors}
            activeAuthorsState={activeAuthorsState}
            setStateFunction={setActiveAuthorsState}
            setChosenElements={setChosenElements}
          />
        ) : (
          ''
        )}
      </div>

      <div
        className={classNames(styles.filter__button, {
          [styles.filter__button_active]: chosenSequence !== '',
        })}
        onClick={() => {
          popUpsCloseOpen(releaseDatesPopUp, setReleaseDatesPopUp);
        }}
      >
        {chosenSequence ? (
          <div className={styles.filter__notation}>
            <div className={styles.filter__notation_content}></div>
          </div>
        ) : (
          ''
        )}
        году выпуска
        {releaseDatesPopUp ? (
          <ReleaseDates
            chosenSequence={chosenSequence}
            chooseSequence={chooseSequence}
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
            uniqueGenres={uniqueGenres}
            activeGenresState={activeGenresState}
            setStateFunction={setActiveGenresState}
            setChosenElements={setChosenElements}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
}
