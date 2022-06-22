import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: null as string | null,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
