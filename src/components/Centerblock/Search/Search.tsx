'use client';

import { useState } from 'react';

import { useAppDispatch } from '@/store/store';
import {
  setSearchline,
  setFiltersApplication,
  setSortedPlayList,
} from '@/store/features/trackSlice';

import styles from '../centerblock.module.css';

export default function Search() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState<string>('');

  function searchInputChange(event: string) {
    setSearchInput(event);

    dispatch(setSearchline(event));
    dispatch(setFiltersApplication());
    dispatch(setSortedPlayList());
  }

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск (не менее трёх символов)"
        name="search"
        onChange={(event) => {
          searchInputChange(event.target.value);
        }}
        value={searchInput}
      />
    </div>
  );
}
