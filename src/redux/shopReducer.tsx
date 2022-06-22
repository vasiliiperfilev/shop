import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import fakeStoreService from '../services/fakeStoreService';
import { setError } from './errorReducer';
import history from '../utils/history';
import { AxiosError } from 'axios';
import { ItemProps } from '../pages/ItemPage';

const shopSlice = createSlice({
  name: 'shop',
  initialState: [] as ItemProps[],
  reducers: {
    setProducts(state, action: PayloadAction<ItemProps[]>) {
      return [...action.payload];
    },
  },
});

export const { setProducts } = shopSlice.actions;

export const initializeProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const products = await fakeStoreService.getProducts(undefined);
      dispatch(setProducts(products));
    } catch (e) {
      const err = e as AxiosError;
      if (!err?.response) {
        dispatch(setError('No Server Response'));
      } else {
        dispatch(setError(err.message));
      }
      history.push('/error');
    }
  };
};

export default shopSlice.reducer;
