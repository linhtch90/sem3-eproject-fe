import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const changePasswordUrl = 'https://localhost:44302/api/user/changepassword';

const initialState = {
  changePassword: null,
};

export const changePassword = createAsyncThunk('/api/user/changepassword', async ({ email, password }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: changePasswordUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      email,
      password,
    },
  });

  return response.data.status;
});

export const adminChangePasswordSlice = createSlice({
  name: 'adminChangePasswordSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.changePassword = action.payload;
    });
  },
});

export default adminChangePasswordSlice.reducer;
