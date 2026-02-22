'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import { getAllSelections } from '@/services/tracksApi';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setActiveGenres,
  setActiveAuthors,
  setFilteredPlayList,
  setFavoritePlayList,
} from '@/store/features/trackSlice';
import { clearStorageTokens } from '@/store/features/authSlice';

import { AllSelectionsPromiseInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from './sidebar.module.css';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [localStorageUser, setLocalStorageUser] = useState<string | null>(null);
  const [sidebarSelections, setSidebarSelections] =
    useState<AllSelectionsPromiseInterface>({
      success: false,
      data: [],
    });

  const username = useAppSelector((state) => state.authentication.username);

  function userLogout(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setFavoritePlayList([]));
    dispatch(clearStorageTokens());

    router.push('/auth/Signin');
  }

  function clearAllFilters(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.stopPropagation();

    dispatch(setActiveGenres([]));
    dispatch(setActiveAuthors([]));
    dispatch(setFilteredPlayList([]));
  }

  useEffect(() => {
    setLocalStorageUser(localStorage.getItem('username'));

    async function getSelections() {
      if (!sidebarSelections.data.length) {
        try {
          const allSelections = await getAllSelections();

          const existingSelections = allSelections.data.filter(
            (selection) => selection.items.length !== 0,
          );

          setSidebarSelections({
            ...sidebarSelections,
            success: allSelections.success,
            data: existingSelections,
          });
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorMessage(error.response.data.message);
            } else if (error.request) {
              setErrorMessage('Подборки временно недоступны, попробуйте позже');
            } else {
              setErrorMessage('Подборки временно недоступны, попробуйте позже');
            }
          }
        }
      }
    }

    getSelections();
  }, []);

  useEffect(() => {
    if (!username) {
      setLocalStorageUser('Нет авторизации');
    }
  }, [username]);

  const sidebarPictures: string[] = [
    '/img/playlist01.png',
    '/img/playlist02.png',
    '/img/playlist03.png',
  ];

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {localStorageUser || 'Нет авторизации'}
        </p>
        <div className={styles.sidebar__icon}>
          <div onClick={(event) => userLogout(event)}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          {sidebarSelections.success ? (
            sidebarSelections.data.map((selection) => {
              return (
                <div key={selection._id} className={styles.sidebar__item}>
                  <Link
                    onClick={(event) => {
                      clearAllFilters(event);
                    }}
                    className={styles.sidebar__link}
                    href={`/categories/${selection._id}`}
                  >
                    <Image
                      priority={true}
                      src={
                        sidebarPictures[
                          Math.floor(Math.random() * sidebarPictures.length)
                        ]
                      }
                      alt="day's playlist"
                      width={250}
                      height={170}
                    />

                    <p>{selection.name}</p>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>{errorMessage ? errorMessage : 'Загрузка подборок'}</p>
          )}
        </div>
      </div>
    </div>
  );
}
