'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Alert } from './types';

export interface AlertState {
  alert: Alert | undefined;
  loading: boolean;
}

const initialState: AlertState = {
  alert: undefined,
  loading: false,
};

export const alertReducer = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setLoadingAlert: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setAlert: (state, action: PayloadAction<Alert | undefined>) => {
      if (!action.payload) {
        state.alert = undefined;
        return;
      }
      state.alert = action.payload;
    },
  },
});

export const { setAlert, setLoadingAlert } = alertReducer.actions;

export default alertReducer.reducer;
