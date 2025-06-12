import { configureStore } from '@reduxjs/toolkit';
import afpsatReducer from '../features/afp/afpsatSlice';

export const store = configureStore({
  reducer: {
    afpsat: afpsatReducer,
  },
});
