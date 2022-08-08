import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllByInvoiceIdUrl = 'https://localhost:44302/api/invoiceitem/byinvoiceid';

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

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const invoiceitemSlice = createSlice({
  name: 'domainSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllItemsByInvoiceId.fulfilled, (state, action) => {
      state.invoiceitems = action.payload;
    });
  },
});

export default invoiceitemSlice.reducer;
