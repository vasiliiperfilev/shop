import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BagItemProps {
  id: string;
  quantity: number;
  price: number;
  image: string;
  title: string;
}

const bagSlice = createSlice({
  name: 'bag',
  initialState: [] as BagItemProps[],
  reducers: {
    addItem(state, action: PayloadAction<Omit<BagItemProps, 'quantity'>>) {
      const bagIndex = state.findIndex((item) => item.id === action.payload.id);
      if (bagIndex === -1) {
        return [...state, { ...action.payload, quantity: 1 }];
      }
      state[bagIndex].quantity += 1;
    },
    changeQuantity(
      state,
      action: PayloadAction<{ id: string; delta: number }>
    ) {
      const { id, delta } = action.payload;
      const bagIndex = state.findIndex((item) => item.id === id);

      if (bagIndex === -1) {
        return [...state];
      }

      if (state[bagIndex].quantity + delta > 0) {
        state[bagIndex].quantity += delta;
      } else {
        state.splice(bagIndex, 1);
      }
    },
  },
});

export const { addItem, changeQuantity } = bagSlice.actions;

export default bagSlice.reducer;
