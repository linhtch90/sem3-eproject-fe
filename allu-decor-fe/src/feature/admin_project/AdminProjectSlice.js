import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const signInUrl = 'https://localhost:44302/api/user/authenticate';

const initialState = {
  user: null,
};

export const signIn = createAsyncThunk('/api/user/authenticate', async ({ email, password }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: signInUrl,
    data: {
      email,
      password,
    },
  });

  if (response.data) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
});

export const adminProjectSlice = createSlice({
  name: 'adminProjectSlice',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { resetUser } = adminProjectSlice.actions;

export default adminProjectSlice.reducer;
