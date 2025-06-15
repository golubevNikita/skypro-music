'use client';

import { useState } from 'react';
import classNames from 'classnames';

import Authors from './PopUps/Authors';
import ReleaseDates from './PopUps/ReleaseDates';
import Genres from './PopUps/Genres';

import { getUniqueValuesByKey } from '@/services/utilities';
import { data } from '@/data';

import styles from './popUps.module.css';

export default function Filter() {
  const [authorsPopUp, setAuthorsPopUp] = useState<boolean>(false);
  const [releaseDatesPopUp, setReleaseDatesPopUp] = useState<boolean>(false);
  const [genresPopUp, setGenresPopUp] = useState<boolean>(false);

  function popUpsCloseOpen(
    popUp: boolean,
    setFunction: (value: React.SetStateAction<boolean>) => void,
  ) {
    setAuthorsPopUp(false);
    setReleaseDatesPopUp(false);
    setGenresPopUp(false);

    setFunction(!popUp);
  }

  function allPopUpsClose(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();

    setAuthorsPopUp(false);
    setReleaseDatesPopUp(false);
    setGenresPopUp(false);
  }

  const [activeAuthorsItems, setActiveAuthorsItems] = useState<string[]>([]);
  const [activeGenresItems, setActiveGenresItems] = useState<string[]>([]);

  function setChosenElements(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setFunction: ([]: string[]) => void,
    arrayState: string[],
  ): void {
    event.preventDefault();
    event.stopPropagation();

    const selectedFilter = event.currentTarget.textContent;

    // Проверка, когда выбранный элемент уже есть в массиве, при этом массив содержит всего один элемент
    if (selectedFilter === arrayState.toString()) {
      setFunction([]);
      return;
    }

    // Проверка на тип "строка"
    if (selectedFilter) {
      // Проверка, когда выбранный элемент уже есть в массиве, при этом массив содержит больше одного элемента
      if (arrayState.toString().includes(selectedFilter)) {
        setFunction(
          arrayState.reduce((newArray: string[], el: string): string[] => {
            if (el !== selectedFilter) {
              newArray.push(el);
            }

            return newArray;
          }, []),
        );

        return;

        // Действие, если выбранного элемента нет в массиве
      } else {
        setFunction([...arrayState, selectedFilter]);

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
      return;
    }
    if (event.currentTarget.textContent) {
      setActiveFilterItem(event.currentTarget.textContent);
      return;
    }
  }

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
          [styles.filter__button_active]: activeAuthorsItems.length !== 0,
        })}
        onClick={() => {
          popUpsCloseOpen(authorsPopUp, setAuthorsPopUp);
        }}
      >
        {activeAuthorsItems.length !== 0 ? (
          <div className={styles.authors__notation}>
            <div className={styles.authors__notation_content}>
              {activeAuthorsItems.length}
            </div>
          </div>
        ) : (
          ''
        )}
        исполнителю
        {authorsPopUp ? (
          <Authors
            uniqueAuthors={getUniqueValuesByKey(data, 'author')}
            activeAuthorsItems={activeAuthorsItems}
            setChosenElements={setChosenElements}
            setFunction={setActiveAuthorsItems}
            arrayState={activeAuthorsItems}
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
          [styles.filter__button_active]: activeGenresItems.length !== 0,
        })}
        onClick={() => {
          popUpsCloseOpen(genresPopUp, setGenresPopUp);
        }}
      >
        {activeGenresItems.length !== 0 ? (
          <div className={styles.genres__notation}>
            <div className={styles.genres__notation_content}>
              {activeGenresItems.length}
            </div>
          </div>
        ) : (
          ''
        )}
        жанру
        {genresPopUp ? (
          <Genres
            uniqueGenres={getUniqueValuesByKey(data, 'genre')}
            activeGenresItems={activeGenresItems}
            setChosenElements={setChosenElements}
            setFunction={setActiveGenresItems}
            arrayState={activeGenresItems}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
}
