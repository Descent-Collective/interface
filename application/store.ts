'use client';
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user';
import menuReducer from './menu';
import collateralReducer from './collateral';
import alertReducer from './alert';
import inputReducer from './input';

export interface CallbackProps {
  onSuccess?: Function;
  onError?: Function;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    collateral: collateralReducer,
    alert: alertReducer,
    input: inputReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;
