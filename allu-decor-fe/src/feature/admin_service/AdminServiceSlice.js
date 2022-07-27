import create from '@ant-design/icons/lib/components/IconFont';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllServiceUrl = 'https://localhost:44302/api/Service';
const createNewServiceUrl = 'https://localhost:44302/api/Service/CreateService';
const updateServiceUrl = 'https://localhost:44302/api/Service/UpdateService';
const deleteServiceUrl = 'https://localhost:44302/api/Service/DeleteService';

const initialState = {
  service: null,
  createNewServiceStatus: null,
  updateServiceStatus: null,
  deleteServiceStatus: null,
};

export const getAllServices = createAsyncThunk('/api/Service', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllServiceUrl,
  });
  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewService = createAsyncThunk('/api/Service/CreateService', async ({ name }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: createNewServiceUrl,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    data: {
      id: '',
      name,
    },
  });
  return response.data.status;
});

export const updateService = createAsyncThunk('/api/Service/updateService', async ({ id, name }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: updateServiceUrl,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    data: {
      id,
      name,
    },
  });
  return response.data.status;
});

export const deleteService = createAsyncThunk('api/Service/DeleteService', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: deleteServiceUrl,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    data: { id },
  });
  return response.data.status;
});

export const adminServiceSlice = createSlice({
  name: 'adminServiceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.services = action.payload;
    }),
      builder.addCase(createNewService.fulfilled, (state, action) => {
        state.createNewServiceStatus = action.payload;
      }),
      builder.addCase(updateService.fulfilled, (state, action) => {
        state.updateServiceStatus = action.payload;
      }),
      builder.addCase(deleteService.fulfilled, (state, action) => {
        state.deleteServiceStatus = action.payload;
      });
  },
});

export default adminServiceSlice.reducer;
