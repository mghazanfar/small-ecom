import { configureStore } from '@reduxjs/toolkit';
import { addToCartSlice } from './items';

export const store = configureStore({
  reducer: addToCartSlice,
})