import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

export const fetchAFPSATData = createAsyncThunk('afpsat/fetchData', async () => {
  try {
    const response = await axios.get(`${PUBLIC_URL}/data/afpsat.json`);
    console.log('fetchAFPSATData response:', response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const afpsatSlice = createSlice({
  name: 'afpsat',
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAFPSATData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAFPSATData.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchAFPSATData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = afpsatSlice.actions;
export default afpsatSlice.reducer;
