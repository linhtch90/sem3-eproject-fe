import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getProductByIdUrl = 'https://localhost:44302/api/product/';

const initialState = {
  cartItems: [],
};

export const getCartProductById = createAsyncThunk('/api/cart/product/id', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getProductByIdUrl + id,
  });

  return response.data.responseObject;
});

export const cartSlice = createSlice({
  name: 'faqSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        const payload = { ...action.payload, quantity: 1, totalprice: action.payload.price };
        state.cartItems.push(payload);
      } else {
        state.cartItems.find((item) => item.id === action.payload.id).quantity += 1;
        state.cartItems.find((item) => item.id === action.payload.id).totalprice =
          state.cartItems.find((item) => item.id === action.payload.id).quantity *
          state.cartItems.find((item) => item.id === action.payload.id).price;
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    setQuantity: (state, action) => {
      if (action.payload.quantity < 100 && action.payload.quantity > 0.5) {
        state.cartItems.find((item) => item.id === action.payload.id).quantity = parseInt(action.payload.quantity);
        state.cartItems.find((item) => item.id === action.payload.id).totalprice =
          state.cartItems.find((item) => item.id === action.payload.id).quantity *
          state.cartItems.find((item) => item.id === action.payload.id).price;
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartProductById.fulfilled, (state, action) => {
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        action.payload.quantity = 1;
        action.payload.totalprice = action.payload.quantity * action.payload.price;
        state.cartItems.push(action.payload);
      }
    });
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, setQuantity, removeItem, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
