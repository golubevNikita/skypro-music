'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

import classNames from 'classnames';

import { useAppDispatch } from '@/store/store';
import {
  setStorageAccessToken,
  setStorageRefreshToken,
  setStorageUsername,
} from '@/store/features/authSlice';

import { userSignup, getBothTokens } from '@/services/authApi';

import { SignupDataInterface } from '@/sharedInterfaces/sharedInterfaces';

import styles from './auth.module.css';

// admin@admin.admin

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [signupData, setSignupData] = useState<SignupDataInterface>({
    email: '',
    password: '',
    username: '',
  });

  function onFormInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.currentTarget.name) {
      case 'login':
        setSignupData({ ...signupData, email: event.currentTarget.value });
        break;

      case 'password':
        setSignupData({ ...signupData, password: event.currentTarget.value });
        break;

      case 'username':
        setSignupData({ ...signupData, username: event.currentTarget.value });
        break;
    }
  }

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  function userFormRequest(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    setErrorMessage('');
    setLoading(true);

    if (signupData.password.trim().length < 6) {
      setErrorMessage('Пароль должен быть не менее 6 символов');
      return;
    }

    if (
      !signupData.email.trim() ||
      !signupData.password.trim() ||
      !signupData.email.trim()
    ) {
      setErrorMessage('Пожалуйста, заполните все поля');
      return;
    }

    userSignup(signupData)
      .then((response) => {
        dispatch(setStorageUsername(response.result.username));
        alert(response.message);

        return getBothTokens(signupData);
      })
      .then((response) => {
        dispatch(setStorageAccessToken(response.access));
        dispatch(setStorageRefreshToken(response.refresh));

        router.push('/music');
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log(error);
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
        value={signupData.email}
        onChange={(event) => onFormInputChange(event)}
      />
      <input
        className={styles.modal__input_signup}
        type="password"
        name="password"
        placeholder="Пароль"
        value={signupData.password}
        onChange={(event) => onFormInputChange(event)}
      />
      <input
        className={styles.modal__input}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        value={signupData.username}
        onChange={(event) => onFormInputChange(event)}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={loading}
        className={styles.modal__btnSignupEnt}
        onClick={(event) => {
          userFormRequest(event);
        }}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
