import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllContactInfoUrl = 'https://localhost:44302/api/ContactInfo';
const createNewContactInfoUrl = 'https://localhost:44302/api/ContactInfo/CreateContactInfo';
const updateContactInfoUrl = 'https://localhost:44302/api/Contactinfo/UpdateContactInfo';
const deleteContactInfoUrl = 'https://localhost:44302/api/ContactInfo/DeleteContactInfo';

const initialState = {
  contactInfo: null,
  createContactInfoStatus: null,
  updateContactInfoStatus: null,
  deleteContactInfoStatus: null,
};

export const getAllContactInfos = createAsyncThunk('/api/ContactInfo', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllContactInfoUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewContactInfo = createAsyncThunk(
  '/api/ContactInfo/CreateContacInfo',
  async ({ address, ward, city, phone, email }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewContactInfoUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        address,
        ward,
        city,
        phone,
        email,
      },
    });

    return response.data.status;
  }
);

export const updateContactInfo = createAsyncThunk(
  '/api/ContactInfo/updateContactInfo',
  async ({ id, address, ward, city, phone, email }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: updateContactInfoUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        address,
        ward,
        city,
        phone,
        email,
      },
    });

    return response.data.status;
  }
);

export const deleteContactInfo = createAsyncThunk('/api/contactInfo/deleteContactInfo', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: deleteContactInfoUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.status;
});

export const adminContactInfoSlice = createSlice({
  name: 'adminContactInfoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllContactInfos.fulfilled, (state, action) => {
      state.contactInfo = action.payload;
    });
    builder.addCase(createNewContactInfo.fulfilled, (state, action) => {
      state.createContactInfoStatus = action.payload;
    });
    builder.addCase(updateContactInfo.fulfilled, (state, action) => {
      state.updateContactInfoStatus = action.payload;
    });
    builder.addCase(deleteContactInfo.fulfilled, (state, action) => {
      state.deleteContactInfoStatus = action.payload;
    });
  },
});

export default adminContactInfoSlice.reducer;
