import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllCustomerReviewPairsUrl = 'https://localhost:44302/api/customerreview';

const initialState = {
  customerReviewPairs: null,
};

export const getAllCustomerReviewPairs = createAsyncThunk('/api/customerreview', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllCustomerReviewPairsUrl,
  });
  response.data.responseObject.map((item) => (item.key = item.id));
  return response.data.responseObject;
});

export const customerReviewSlice = createSlice({
  name: 'customerReviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomerReviewPairs.fulfilled, (state, action) => {
      state.customerReviewPairs = action.payload;
    });
  },
});

export default customerReviewSlice.reducer;
