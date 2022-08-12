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
    localStorage.setItem('userid', response.data.id);
    localStorage.setItem('userrole', response.data.role);
    localStorage.setItem('userFirstname', response.data.firstname);
    localStorage.setItem('userAddress', response.data.address);
    localStorage.setItem('userDistrict', response.data.district);
    localStorage.setItem('userCity', response.data.city);
  }

  return response.data;
});

export const userSlice = createSlice({
  name: 'userSlice',
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

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
