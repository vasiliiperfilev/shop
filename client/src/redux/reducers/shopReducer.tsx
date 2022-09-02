import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import store from '../../services/store/storeService';
import { setError } from './errorReducer';
import history from '../../utils/history';
import { AxiosError } from 'axios';
import { Item } from '../../services/store/types';

const shopSlice = createSlice({
  name: 'shop',
  initialState: [] as Item[],
  reducers: {
    setProducts(state, action: PayloadAction<Item[]>) {
      return [...action.payload];
    },
  },
});

export const { setProducts } = shopSlice.actions;

export const initializeProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const products = await store.getProducts(undefined);
      dispatch(setProducts(products));
    } catch (e) {
      const err = e as AxiosError;
      if (!err?.response) {
        dispatch(setError('No Server Response'));
      } else {
        dispatch(setError(err.message));
      }
      history.push('/shop/error');
    }
  };
};

export default shopSlice.reducer;
