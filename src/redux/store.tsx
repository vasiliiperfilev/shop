import { configureStore } from '@reduxjs/toolkit';
import bagReducer from './bagReducer';
import categoriesReduces from './categoriesReduces';
import errorReducer from './errorReducer';
import shopReducer from './shopReducer';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    error: errorReducer,
    bag: bagReducer,
    categories: categoriesReduces,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
