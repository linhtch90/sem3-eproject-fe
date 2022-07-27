import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllDomainsUrl = 'https://localhost:44302/api/Domain';
const createNewDomainUrl = 'https://localhost:44302/api/Domain/CreateDomain';
const updateDomainUrl = 'https://localhost:44302/api/Domain/UpdateDomain';
const deleteDomainUrl = 'https://localhost:44302/api/Domain/DeleteDomain';

const initialState = {
  domains: null,
  createDomainStatus: null,
  updateDomainStatus: null,
  deleteDomainStatus: null,
};

export const getAllDomains = createAsyncThunk('/api/Domain', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllDomainsUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewDomain = createAsyncThunk('/api/Domain/CreateDomain', async ({ name }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: createNewDomainUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id: '',
      name,
    },
  });

  return response.data.status;
});

export const updateDomain = createAsyncThunk('/api/Domain/UpdateDomain', async ({ id, name }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: updateDomainUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
      name,
    },
  });

  return response.data.status;
});

export const deleteDomain = createAsyncThunk('/api/Domain/DeleteDomain', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: deleteDomainUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.status;
});

export const adminDomainSlice = createSlice({
  name: 'adminDomainSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDomains.fulfilled, (state, action) => {
      state.domains = action.payload;
    });
    builder.addCase(createNewDomain.fulfilled, (state, action) => {
      state.createDomainStatus = action.payload;
    });
    builder.addCase(updateDomain.fulfilled, (state, action) => {
      state.updateDomainStatus = action.payload;
    });
    builder.addCase(deleteDomain.fulfilled, (state, action) => {
      state.deleteDomainStatus = action.payload;
    });
  },
});

export default adminDomainSlice.reducer;
