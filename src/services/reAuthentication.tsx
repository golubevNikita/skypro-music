import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';

import { refreshAccesToken } from './authApi';

import { setStorageAccessToken } from '@/store/features/authSlice';

export async function reAuthentication<T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> {
  try {
    // Пытаемся выполнить запрос
    return await apiFunction('');
  } catch (error) {
    const axiosError = error as AxiosError;

    // Если ошибка 401, обновляем токен и повторяем запрос
    if (axiosError.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccesToken(refresh); // Обновляем токен
        dispatch(setStorageAccessToken(newAccessToken.access));
        // Повторяем исходный запрос
        return await apiFunction(newAccessToken.access);
      } catch (refreshError) {
        // Если обновление токена не удалось, пробрасываем ошибку
        throw refreshError;
      }
    }

    // Если ошибка не 401, пробрасываем её
    throw error;
  }
}
