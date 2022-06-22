import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './errorReducer';
import shopReducer from './shopReducer';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
