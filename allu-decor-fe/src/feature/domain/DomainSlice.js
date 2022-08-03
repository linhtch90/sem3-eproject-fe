import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllDomainsUrl = 'https://localhost:44302/api/domain';

const initialState = {
  domains: null,
};

export const getAllDomains = createAsyncThunk('/api/domain', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllDomainsUrl,
  });

  return response.data.responseObject;
});

export const domainSlice = createSlice({
  name: 'domainSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDomains.fulfilled, (state, action) => {
      state.domains = action.payload;
    });
  },
});

export default domainSlice.reducer;
