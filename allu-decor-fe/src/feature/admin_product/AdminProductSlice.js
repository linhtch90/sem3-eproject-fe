import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllProductsUrl = 'https://localhost:44302/api/product';
const createNewProductUrl = 'https://localhost:44302/api/product/createproduct';
const updateProductUrl = 'https://localhost:44302/api/product/updateproduct';
const deleteProductUrl = 'https://localhost:44302/api/product/deleteproduct';

const getAllDomainsUrl = 'https://localhost:44302/api/domain';
const getAllServicesUrl = 'https://localhost:44302/api/service';

const initialState = {
  products: null,
  createProductStatus: null,
  updateProductStatus: null,
  deleteProductStatus: null,
};

export const getAllProducts = createAsyncThunk('/api/product', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllProductsUrl,
  });

  const responseDomain = await axios({
    method: 'get',
    url: getAllDomainsUrl,
  });

  const responseService = await axios({
    method: 'get',
    url: getAllServicesUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));
  response.data.responseObject.map((item) => {
    responseDomain.data.responseObject.map((domain) => {
      if (domain.id === item.domainid) {
        item.domain = domain.name;
      }
    });

    responseService.data.responseObject.map((service) => {
      if (service.id === item.serviceid) {
        item.service = service.name;
      }
    });
  });

  return response.data.responseObject;
});

export const createNewProduct = createAsyncThunk(
  '/api/product/createproduct',
  async ({ name, price, image, description, domainid, serviceid }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewProductUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        name,
        price,
        image,
        description,
        domainid,
        serviceid,
      },
    });

    return response.data.status;
  }
);

export const updateProduct = createAsyncThunk(
  '/api/product/updateproduct',
  async ({ id, name, price, image, description, domainid, serviceid }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: updateProductUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        name,
        price,
        image,
        description,
        domainid,
        serviceid,
      },
    });

    return response.data.status;
  }
);

export const deleteProduct = createAsyncThunk('/api/product/deleteproduct', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: deleteProductUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.status;
});

export const adminProductSlice = createSlice({
  name: 'adminProductSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.createProductStatus = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.updateProductStatus = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteProductStatus = action.payload;
    });
  },
});

export default adminProductSlice.reducer;
