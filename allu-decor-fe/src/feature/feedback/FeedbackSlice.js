import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const createFeedbackUrl = 'https://localhost:44302/api/feedback/createfeedback';
const getAllByProductIdUrl = 'https://localhost:44302/api/feedback/getallbyproductid';

const initialState = {
  feedbacks: null,
  createFeedbackStatus: null,
};

export const createFeedback = createAsyncThunk(
  '/api/feedback/createfeedback',
  async ({ firstname, lastname, userid, content, createat, productid }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createFeedbackUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        firstname,
        lastname,
        userid,
        content,
        createat,
        productid,
      },
    });

    return response.data.responseObject;
  }
);

export const getAllByProductId = createAsyncThunk('/api/feedback/getallbyproductid', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getAllByProductIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.responseObject;
});

export const feedbackSlice = createSlice({
  name: 'domainSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createFeedback.fulfilled, (state, action) => {
      state.createFeedbackStatus = action.payload;
    });
    builder.addCase(getAllByProductId.fulfilled, (state, action) => {
      state.feedbacks = action.payload;
    });
  },
});

export default feedbackSlice.reducer;
