import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllFeedbackUrl = 'https://localhost:44302/api/feedback';
const removeFeedbackByIdUrl = 'https://localhost:44302/api/feedback/deletefeedback';

const initialState = {
  feedbacks: null,
  removeFeedbackStatus: null,
};

export const getAllFeedback = createAsyncThunk('/api/feedback/getall', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllFeedbackUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const removeFeedbackById = createAsyncThunk('/api/feedback/deletebyid', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: removeFeedbackByIdUrl,
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
    builder.addCase(getAllFeedback.fulfilled, (state, action) => {
      state.feedbacks = action.payload;
    });
    builder.addCase(removeFeedbackById.fulfilled, (state, action) => {
      state.removeFeedbackStatus = action.payload;
    });
  },
});

export default feedbackSlice.reducer;
