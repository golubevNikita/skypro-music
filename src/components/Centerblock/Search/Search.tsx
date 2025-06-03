'use client';

import { useState } from 'react';

import styles from '../centerblock.module.css';

export default function Search() {
  const [searchInput, setSearchInput] = useState<string>('');

  function searchInputChange(event: string) {
    setSearchInput(event);
  }

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        onChange={(event) => {
          searchInputChange(event.target.value);
        }}
        value={searchInput}
      />
    </div>
  );
}
