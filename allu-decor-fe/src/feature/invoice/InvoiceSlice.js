import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const createInvoiceUrl = 'https://localhost:44302/api/invoice/createinvoice';
const createInvoiceitemUrl = 'https://localhost:44302/api/invoiceitem/createinvoiceitem';
const getAllInvoiceUrl = 'https://localhost:44302/api/invoice';
const getAllInvoiceByUserIdUrl = 'https://localhost:44302/api/invoice/byuserid';
const updateInvoiceUrl = 'https://localhost:44302/api/invoice/updateinvoice';

const initialState = {
  createdInvoiceId: '',
  invoices: null,
  invoicesByUserId: null,
  updateInvoiceStatus: '',
};

export const createInvoice = createAsyncThunk(
  '/api/invoice/createinvoice',
  async ({ createat, totalprice, status, userid, cartItems }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createInvoiceUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: { id: '', createat, totalprice, status, userid },
    });

    cartItems.map((item) =>
      createInvoiceitem({
        invoiceid: response.data.responseObject.id,
        productid: item.id,
        quantity: item.quantity,
        totalprice: item.totalprice,
      })
    );

    return response.data.responseObject;
  }
);

export const createInvoiceitem = async ({ invoiceid, productid, quantity, totalprice }) => {
  await axios({
    method: 'post',
    url: createInvoiceitemUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: { id: '', invoiceid, productid, quantity, totalprice },
  });
};

export const getAllInvoices = createAsyncThunk('/api/invoice', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllInvoiceUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const getAllInvoicesByUserId = createAsyncThunk('/api/invoice/clientinvoice', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getAllInvoiceByUserIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: { id },
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const updateInvoice = createAsyncThunk(
  '/api/invoice/updateinvoice',
  async ({ id, createat, totalprice, status, userid }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: updateInvoiceUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: { id, createat, totalprice, status, userid },
    });

    return response.data.responseObject;
  }
);

export const invoiceSlice = createSlice({
  name: 'invoiceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.createdInvoiceId = action.payload.id;
    });
    builder.addCase(getAllInvoices.fulfilled, (state, action) => {
      state.invoices = action.payload;
    });
    builder.addCase(getAllInvoicesByUserId.fulfilled, (state, action) => {
      state.invoicesByUserId = action.payload;
    });
    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      state.updateInvoiceStatus = action.payload;
    });
  },
});

export default invoiceSlice.reducer;
