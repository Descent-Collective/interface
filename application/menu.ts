'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface MenuState {
  supply: boolean;
  borrow: boolean;
}

const initialState: MenuState = {
  supply: false,
  borrow: false,
};

export const menuReducer = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSupply: (state, action: PayloadAction<boolean>) => {
      state.borrow = false;
      state.supply = action.payload;
    },

    setBorrow: (state, action: PayloadAction<boolean>) => {
      state.supply = false;
      state.borrow = action.payload;
    },
  },
});

export const { setBorrow, setSupply } = menuReducer.actions;

export default menuReducer.reducer;
