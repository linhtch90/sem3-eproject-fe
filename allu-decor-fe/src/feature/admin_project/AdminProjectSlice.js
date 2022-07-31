import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllProjectsUrl = 'https://localhost:44302/api/project';
const createNewProjectUrl = 'https://localhost:44302/api/project/createproject';
const updateProjectUrl = 'https://localhost:44302/api/project/updateproject';
const deleteProjectUrl = 'https://localhost:44302/api/project/deleteproject';

const initialState = {
  projects: null,
  createProjectStatus: null,
  updateProjectStatus: null,
  deleteProjectStatus: null,
};

export const getAllProjects = createAsyncThunk('/api/project', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllProjectsUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));

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

export const deleteProject = createAsyncThunk('/api/project/deleteproject', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: deleteProjectUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.status;
});

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
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.deleteProjectStatus = action.payload;
    });
  },
});

export default adminProjectSlice.reducer;
