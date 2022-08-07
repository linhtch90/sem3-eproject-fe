import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const createInvoiceUrl = 'https://localhost:44302/api/invoice/createinvoice';
const createInvoiceitemUrl = 'https://localhost:44302/api/invoiceitem/createinvoiceitem';

const initialState = {
  createdInvoiceId: '',
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

export const invoiceSlice = createSlice({
  name: 'invoiceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.createdInvoiceId = action.payload.id;
    });
  },
});

export default invoiceSlice.reducer;
