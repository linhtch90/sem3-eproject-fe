import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllServicesUrl = 'https://localhost:44302/api/service';

const initialState = {
  services: null,
};

export const getAllServices = createAsyncThunk('/api/service', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllServicesUrl,
  });

  return response.data.responseObject;
});

export const serviceSlice = createSlice({
  name: 'serviceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.services = action.payload;
    });
  },
});

export default serviceSlice.reducer;
