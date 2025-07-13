'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useAppDispatch } from '@/store/store';
import {
  setActiveGenres,
  setActiveAuthors,
  setCurrentPlayListName,
  setFilteredPlayList,
} from '@/store/features/trackSlice';

import styles from './main.module.css';

export default function Main() {
  const dispatch = useAppDispatch();

  const [burgerMenu, setBurgerMenu] = useState<boolean>(true);

  function burgerMenuCloseOpen() {
    setBurgerMenu(!burgerMenu);
  }

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
          width={113}
          height={17}
        />
      </div>
      <div className={styles.nav__burger} onClick={burgerMenuCloseOpen}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>

      {burgerMenu ? (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link
                onClick={() => {
                  dispatch(setActiveGenres([]));
                  dispatch(setActiveAuthors([]));
                  dispatch(setCurrentPlayListName('Треки'));
                  dispatch(setFilteredPlayList());
                }}
                href="/music"
                className={styles.menu__link}
              >
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="#" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="../signin.html" className={styles.menu__link}>
                Выйти
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ''
      )}
    </nav>
  );
}
