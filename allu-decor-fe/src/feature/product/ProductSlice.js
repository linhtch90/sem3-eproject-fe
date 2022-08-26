import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllProductsUrl = 'https://localhost:44302/api/product';
const getProductByIdUrl = 'https://localhost:44302/api/product/';
const getProductByNameUrl = 'https://localhost:44302/api/product/searchbyname';
const filterProductByDomainUrl = 'https://localhost:44302/api/product/filterbydomainid';
const filterProductByServiceUrl = 'https://localhost:44302/api/product/filterbyserviceid';

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

export const getProductByName = createAsyncThunk('/api/product/searchbyname', async ({ name }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getProductByNameUrl,
    data: {
      name,
    },
  });

  return response.data.responseObject;
});

export const filterProductByDomain = createAsyncThunk('/api/product/filterbydomainid', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: filterProductByDomainUrl,
    data: {
      id,
    },
  });

  return response.data.responseObject;
});

export const filterProductByService = createAsyncThunk('/api/product/filterbyserviceid', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: filterProductByServiceUrl,
    data: {
      id,
    },
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
    builder.addCase(getProductByName.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(filterProductByDomain.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(filterProductByService.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
