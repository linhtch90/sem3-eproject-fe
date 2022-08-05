import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'faqSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!state.cartItems.includes(action.payload)) {
        state.cartItems.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
