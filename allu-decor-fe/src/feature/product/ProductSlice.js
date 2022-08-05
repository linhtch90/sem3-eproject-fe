import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllProductsUrl = 'https://localhost:44302/api/product';
const getProductByIdUrl = 'https://localhost:44302/api/product/';

const initialState = {
  products: null,
  productDetail: null,
};

export const getAllProducts = createAsyncThunk('/api/product', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllProductsUrl,
  });

  return response.data.responseObject;
});

export const getProductById = createAsyncThunk('/api/product/id', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getProductByIdUrl + id,
  });

  return response.data.responseObject;
});

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
  },
});

export default productSlice.reducer;
