import { useEffect } from 'react';

import { useAppDispatch } from '@/store/store';
import {
  setStorageUsername,
  setStorageAccessToken,
  setStorageRefreshToken,
} from '@/store/features/authSlice';

// import { LS_USER, LS_TOKENS } from '@/services/utilities';

export function useAuthHook() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = localStorage.getItem('username') || '';
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';

    console.log('useAuthHook');

    dispatch(setStorageUsername(username));
    dispatch(setStorageAccessToken(access));
    dispatch(setStorageRefreshToken(refresh));
  }, [dispatch]);
}
