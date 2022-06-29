import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import fakeStoreService from '../services/fakeStoreService';
import { setError } from './errorReducer';
import history from '../utils/history';
import { AxiosError } from 'axios';

const categoriesSlice = createSlice({
  name: 'bag',
  initialState: [] as string[],
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      return action.payload;
    },
  },
});

export const initilizeCategories = () => async (dispatch: Dispatch) => {
  let fetchedCategories: string[] = [];
  try {
    fetchedCategories = await fakeStoreService.getCategories();
  } catch (e) {
    const err = e as AxiosError;
    if (!err?.response) {
      dispatch(setError('No Server Response'));
    } else {
      dispatch(setError(err.message));
    }
    history.push('/error');
  }
  dispatch(setCategories(fetchedCategories));
};

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
