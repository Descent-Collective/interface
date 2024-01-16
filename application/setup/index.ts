'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SetupState {
  loadingSetup: boolean;
}

const initialState: SetupState = {
  loadingSetup: false,
};

export const setupReducer = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    setLoadingSetup: (state, action: PayloadAction<boolean>) => {
      state.loadingSetup = action.payload;
    },
  },
});

export const { setLoadingSetup } = setupReducer.actions;

export default setupReducer.reducer;
