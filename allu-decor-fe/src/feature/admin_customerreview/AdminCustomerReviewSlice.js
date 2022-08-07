import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllCustomerReviewsUrl = 'https://localhost:44302/api/customerreview';
const createNewCustomerReviewUrl = 'https://localhost:44302/api/customerreview/createcustomerreview';
const updateCustomerReviewUrl = 'https://localhost:44302/api/customerreview/updatecustomerreview';
const deleteCustomerReviewUrl = 'https://localhost:44302/api/customerreview/deletecustomerreview';

const initialState = {
  customerreviews: null,
  createCustomerReviewStatus: null,
  updateCustomerReviewStatus: null,
  deleteCustomerReviewStatus: null,
};

export const getAllCustomerReviews = createAsyncThunk('/api/customerreview', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllCustomerReviewsUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewCustomerReview = createAsyncThunk(
  '/api/customerreview/createcustomerreview',
  async ({ firstname, lastname, company, content, image }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewCustomerReviewUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        firstname,
        lastname,
        company,
        content,
        image,
      },
    });

    return response.data.status;
  }
);

export const updateCustomerReview = createAsyncThunk(
  '/api/customerreview/updatecustomerreview',
  async ({ id, firstname, lastname, company, content, image }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: updateCustomerReviewUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        firstname,
        lastname,
        company,
        content,
        image,
      },
    });

    return response.data.status;
  }
);

export const deleteCustomerReview = createAsyncThunk(
  '/api/customerreview/deletecustomerreview',
  async ({ id }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: deleteCustomerReviewUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
      },
    });

    return response.data.status;
  }
);

export const adminCustomerReviewSlice = createSlice({
  name: 'adminCustomerReviewSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomerReviews.fulfilled, (state, action) => {
      state.customerreviews = action.payload;
    });
    builder.addCase(createNewCustomerReview.fulfilled, (state, action) => {
      state.createCustomerReviewStatus = action.payload;
    });
    builder.addCase(updateCustomerReview.fulfilled, (state, action) => {
      state.updateCustomerReviewStatus = action.payload;
    });
    builder.addCase(deleteCustomerReview.fulfilled, (state, action) => {
      state.deleteCustomerReviewStatus = action.payload;
    });
  },
});

export default adminCustomerReviewSlice.reducer;
