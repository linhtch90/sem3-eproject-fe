import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const projectUrl = 'https://localhost:44302/api/Project';

const initialState = {
  projects: [],
};

export const getAllProjects = createAsyncThunk('/api/Project', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: projectUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data.responseObject;
});

export const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
  },
});

export default projectSlice.reducer;
