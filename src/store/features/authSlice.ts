import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  username: string;
  access: string;
  refresh: string;
}

const initialState: initialState = {
  username: '',
  access: '',
  refresh: '',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setStorageUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },

    setStorageAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      localStorage.setItem('access', action.payload);
    },

    setStorageRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload;
      localStorage.setItem('refresh', action.payload);
    },

    clearStorageTokens: (state) => {
      state.username = '';
      state.refresh = '';
      state.access = '';

      localStorage.removeItem('username');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
});

export const {
  setStorageUsername,
  setStorageAccessToken,
  setStorageRefreshToken,
  clearStorageTokens,
} = authSlice.actions;

export const authSliceSliceReducer = authSlice.reducer;
