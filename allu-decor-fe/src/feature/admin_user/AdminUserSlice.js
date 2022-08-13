import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllUsersUrl = 'https://localhost:44302/api/user';
const createNewUserUrl = 'https://localhost:44302/api/user/createuser';
const updateUserWithoutPasswordUrl = 'https://localhost:44302/api/user/updateuserwithoutpassword';
const updateUserUrl = 'https://localhost:44302/api/user/updateuser';
const deleteUserUrl = 'https://localhost:44302/api/user/deleteuser';

const initialState = {
  users: null,
  createUserStatus: null,
  updateUserStatus: null,
  updateUserWithoutPasswordStatus: null,
  deleteUserStatus: null,
};

export const getAllUsers = createAsyncThunk('/api/user', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllUsersUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewUser = createAsyncThunk(
  '/api/user/createuser',
  async ({ firstname, lastname, address, district, city, phone, email, password }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewUserUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        firstname,
        lastname,
        address,
        district,
        city,
        phone,
        email,
        password,
      },
    });

    return response.data.status;
  }
);

export const updateUserWithoutPassword = createAsyncThunk(
  '/api/user/updateuserwithoutpassword',
  async ({ id, firstname, lastname, address, district, city, phone, email }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: updateUserWithoutPasswordUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        firstname,
        lastname,
        address,
        district,
        city,
        phone,
        email,
      },
    });

    return response.data.status;
  }
);

export const updateUser = createAsyncThunk(
  '/api/user/updateuser',
  async ({ id, firstname, lastname, address, district, city, phone, email, password }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: updateUserUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        firstname,
        lastname,
        address,
        district,
        city,
        phone,
        email,
        password,
      },
    });

    return response.data.status;
  }
);

export const deleteUser = createAsyncThunk('/api/user/deleteuser', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: deleteUserUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.status;
});

export const adminUserSlice = createSlice({
  name: 'adminUserSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.createUserStatus = action.payload;
    });
    builder.addCase(updateUserWithoutPassword.fulfilled, (state, action) => {
      state.updateUserWithoutPasswordStatus = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateUserStatus = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.deleteUserStatus = action.payload;
    });
  },
});

export default adminUserSlice.reducer;
