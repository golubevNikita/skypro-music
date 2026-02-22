'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilteredPlayList,
  setFavoritePlayList,
  setCurrentPlayListName,
  setActiveGenres,
  setActiveAuthors,
} from '@/store/features/trackSlice';
import { clearStorageTokens } from '@/store/features/authSlice';

import styles from './main.module.css';

export default function Main() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [burgerMenu, setBurgerMenu] = useState<boolean>(true);

  const access = useAppSelector((state) => state.authentication.access);

  function burgerMenuCloseOpen() {
    setBurgerMenu(!burgerMenu);
  }

  function userLogout(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();

    if (event.currentTarget.textContent === 'Войти') {
      router.push('/auth/Signin');
    }

    if (event.currentTarget.textContent === 'Выйти') {
      dispatch(setFavoritePlayList([]));
      dispatch(setCurrentPlayListName('Треки'));
      dispatch(clearStorageTokens());

      router.push('/');
    }
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
                  dispatch(setFilteredPlayList([]));
                }}
                href="/"
                className={styles.menu__link}
              >
                Главное
              </Link>
            </li>

            {access ? (
              <li className={styles.menu__item}>
                <Link
                  onClick={() => {
                    dispatch(setActiveGenres([]));
                    dispatch(setActiveAuthors([]));
                    dispatch(setFilteredPlayList([]));
                  }}
                  href={'/categories/favorite-tracks'}
                  className={styles.menu__link}
                >
                  Мой плейлист
                </Link>
              </li>
            ) : (
              ''
            )}

            <li className={styles.menu__item}>
              <div
                onClick={(event) => userLogout(event)}
                className={styles.menu__link}
              >
                {access ? 'Выйти' : 'Войти'}
              </div>
            </li>
          </ul>
        </div>
      ) : (
        ''
      )}
    </nav>
  );
}
