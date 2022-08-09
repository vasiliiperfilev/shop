import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../services/auth/types';
import { Order } from '../../services/orders/types';

const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      if (action.payload) {
        return { ...action.payload };
      } else {
        return null;
      }
    },
    addOrder(state, action: PayloadAction<Order>) {
      if (state) {
        return { ...state, orders: [...state.orders, action.payload] };
      } else {
        throw new Error('Unlogged user tries to post an order');
      }
    },
  },
});

export const { setUser, addOrder } = userSlice.actions;

export default userSlice.reducer;
