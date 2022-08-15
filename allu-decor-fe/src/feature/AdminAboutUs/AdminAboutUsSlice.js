import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllAboutUsUrl = 'https://localhost:44302/api/Aboutu';
const createNewAboutUsUrl = 'https://localhost:44302/api/Aboutu/CreateAboutu';
const updateAboutUsUrl = 'https://localhost:44302/api/Aboutu/UpdateAboutu';
const deleteAboutUsUrl = 'https://localhost:44302/api/Aboutu/DeleteAboutu';

const initialState = {
  aboutUs: null,
  createAboutUsStatus: null,
  updateAboutUsStatus: null,
  deleteAboutUsStatus: null,
};

export const getAllAboutUs = createAsyncThunk('/api/Aboutu', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllAboutUsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewAboutUs = createAsyncThunk('/api/AboutUs/CreateAboutu', async ({ content }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: createNewAboutUsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id: '',
      content,
    },
  });

  return response.data.status;
});

export const updateAboutUs = createAsyncThunk('/api/Aboutu/updateAboutu', async ({ id, content }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: updateAboutUsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
      content,
    },
  });

  return response.data.status;
});

export const deleteAboutUs = createAsyncThunk('/api/Aboutu/deleteAboutu', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: deleteAboutUsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.status;
});

export const adminAboutUsSlice = createSlice({
  name: 'adminAboutUs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAboutUs.fulfilled, (state, action) => {
      state.aboutUs = action.payload;
    });
    builder.addCase(createNewAboutUs.fulfilled, (state, action) => {
      state.createAboutUsStatus = action.payload;
    });
    builder.addCase(updateAboutUs.fulfilled, (state, action) => {
      state.updateAboutUsStatus = action.payload;
    });
    builder.addCase(deleteAboutUs.fulfilled, (state, action) => {
      state.deleteAboutUsStatus = action.payload;
    });
  },
});

export default adminAboutUsSlice.reducer;
