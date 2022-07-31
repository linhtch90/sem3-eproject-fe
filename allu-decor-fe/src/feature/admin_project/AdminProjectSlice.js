import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllProjectsUrl = 'https://localhost:44302/api/project';
const createNewProjectUrl = 'https://localhost:44302/api/project/createproject';
const updateProjectUrl = 'https://localhost:44302/api/project/updateproject';

const initialState = {
  projects: null,
  createProjectStatus: null,
  updateProjectStatus: null,
};

export const getAllProjects = createAsyncThunk('/api/project', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllProjectsUrl,
  });

  console.log('Getting all projects');

  return response.data.responseObject;
});

export const createNewProject = createAsyncThunk(
  '/api/project/createproject',
  async ({ name, status, image, description }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewProjectUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        name,
        status,
        image,
        description,
      },
    });

    return response.data.status;
  }
);

export const updateProject = createAsyncThunk(
  '/api/project/updateproject',
  async ({ id, name, status, image, description }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: updateProjectUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        name,
        status,
        image,
        description,
      },
    });

    return response.data.status;
  }
);

export const adminProjectSlice = createSlice({
  name: 'adminProjectSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
    });
    builder.addCase(createNewProject.fulfilled, (state, action) => {
      state.createProjectStatus = action.payload;
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.updateProjectStatus = action.payload;
    });
  },
});

export default adminProjectSlice.reducer;
