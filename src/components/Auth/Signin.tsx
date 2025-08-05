'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Link from 'next/link';
import classNames from 'classnames';

import { useAppDispatch } from '@/store/store';
import {
  setStorageAccessToken,
  setStorageRefreshToken,
  setStorageUsername,
} from '@/store/features/authSlice';

import { userSignin, getBothTokens } from '@/services/authApi';

import { SigninDataInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from './auth.module.css';

// admin@admin.admin

export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [signinData, setSigninData] = useState<SigninDataInterface>({
    email: '',
    password: '',
  });

  function onFormInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.currentTarget.name) {
      case 'login':
        setSigninData({ ...signinData, email: event.currentTarget.value });
        break;
      case 'password':
        setSigninData({ ...signinData, password: event.currentTarget.value });
        break;
    }
  }

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  function userFormRequest(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    setErrorMessage('');

    if (!signinData.email.trim() || !signinData.password.trim()) {
      setErrorMessage('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);

    userSignin(signinData)
      .then((response) => {
        dispatch(setStorageUsername(response.username));
        return getBothTokens(signinData);
      })
      .then((response) => {
        dispatch(setStorageAccessToken(response.access));
        dispatch(setStorageRefreshToken(response.refresh));

        router.push('/music');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage('Проверьте интернет-соединение и попробуйте позже');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        value={signinData.email}
        onChange={(event) => onFormInputChange(event)}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        value={signinData.password}
        onChange={(event) => onFormInputChange(event)}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={loading}
        className={styles.modal__btnEnter}
        onClick={(event) => {
          userFormRequest(event);
        }}
      >
        Войти
      </button>
      <Link className={styles.modal__btnSignup} href="/auth/Signup">
        Зарегистрироваться
      </Link>
    </>
  );
}
