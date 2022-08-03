import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../services/store/types/item';

export interface BagItemProps extends Item {
  quantity: number;
}

const bagSlice = createSlice({
  name: 'bag',
  initialState: [] as BagItemProps[],
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const bagIndex = state.findIndex((item) => item.id === action.payload.id);
      if (bagIndex === -1) {
        return [...state, { ...action.payload, quantity: 1 }];
      }
      state[bagIndex].quantity += 1;
    },
    setQuantity(
      state,
      action: PayloadAction<{ id: string; newQuantity: number }>
    ) {
      const { id, newQuantity } = action.payload;
      const bagIndex = state.findIndex((item) => item.id === id);

      if (bagIndex === -1) {
        return [...state];
      }

      if (newQuantity > 0) {
        state[bagIndex].quantity = newQuantity;
      } else {
        state.splice(bagIndex, 1);
      }
    },
  },
});

export const { addItem, setQuantity } = bagSlice.actions;

export default bagSlice.reducer;
