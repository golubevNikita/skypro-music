import { useEffect } from 'react';

import { useAppDispatch } from '@/store/store';
import {
  setStorageUsername,
  setStorageAccessToken,
  setStorageRefreshToken,
} from '@/store/features/authSlice';

export function useAuthHook() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = localStorage.getItem('username') || '';
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';

    dispatch(setStorageUsername(username));
    dispatch(setStorageAccessToken(access));
    dispatch(setStorageRefreshToken(refresh));
  }, [dispatch]);
}
