'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User, defaultUser } from './types';

export interface UserState {
  user: User;
  loading: boolean;
  loadingSetup: boolean;
}

const initialState: UserState = {
  user: defaultUser,
  loading: true,
  loadingSetup: false,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setLoadingSetup: (state, action: PayloadAction<boolean>) => {
      state.loadingSetup = action.payload;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setLoading, setUser, setLoadingSetup } = userReducer.actions;

export default userReducer.reducer;
