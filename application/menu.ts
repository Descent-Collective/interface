'use client';
import { createSlice } from '@reduxjs/toolkit';

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
    setSupply: (state) => {
      state.borrow = false;
      state.supply = !state.supply;
    },

    setBorrow: (state) => {
      state.supply = false;
      state.borrow = !state.borrow;
    },
  },
});

export const { setBorrow, setSupply } = menuReducer.actions;

export default menuReducer.reducer;
