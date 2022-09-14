import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllByInvoiceIdUrl = 'https://localhost:44302/api/invoiceitem/byinvoiceid';
const getAllProductsUrl = 'https://localhost:44302/api/product/';

const initialState = {
  invoiceitems: null,
};

export const getAllItemsByInvoiceId = createAsyncThunk('/api/invoiceitem/byinvoiceid', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getAllByInvoiceIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: { id },
  });

  const responseProducts = await axios({
    method: 'get',
    url: getAllProductsUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  response.data.responseObject.map((item) => {
    responseProducts.data.responseObject.map((product) => {
      if (item.productid === product.id) {
        item.name = product.name;
        item.price = product.price;
      }
    });
  });

  return response.data.responseObject;
});

export const invoiceitemSlice = createSlice({
  name: 'domainSlice',
  initialState,
  reducers: {
    resetInvoiceItems: (state) => {
      state.invoiceitems = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllItemsByInvoiceId.fulfilled, (state, action) => {
      state.invoiceitems = action.payload;
    });
  },
});

export const { resetInvoiceItems } = invoiceitemSlice.actions;

export default invoiceitemSlice.reducer;
