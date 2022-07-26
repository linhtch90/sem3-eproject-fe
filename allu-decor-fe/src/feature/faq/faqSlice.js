import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkMDk2YjY2LWVmYTctNGVhZS05MDJlLTAyNzZlYzM4NTRmNSIsIm5iZiI6MTY1ODg0NTQ1MCwiZXhwIjoxNjU5NDUwMjUwLCJpYXQiOjE2NTg4NDU0NTB9.JzNpcSONLLv0_bN9NZVm9_iyOIYz-SBJY3Us4W9pBac';

const getAllFaqPairsUrl = 'https://localhost:44302/api/faq';

const initialState = {
  faqPairs: null,
};

export const getAllFaqPairs = createAsyncThunk('/api/faq', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllFaqPairsUrl,
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data.responseObject;
});

export const faqSlice = createSlice({
  name: 'faqSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFaqPairs.fulfilled, (state, action) => {
      state.faqPairs = action.payload;
    });
  },
});

export default faqSlice.reducer;
