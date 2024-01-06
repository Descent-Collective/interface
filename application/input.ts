'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface InputState {
  clear: boolean;
}

const initialState: InputState = {
  clear: false,
};

export const inputReducer = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setClearInputs: (state, action: PayloadAction<boolean>) => {
      state.clear = action.payload;
    },
  },
});

export const { setClearInputs } = inputReducer.actions;

export default inputReducer.reducer;
