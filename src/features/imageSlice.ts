// features/imageSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageUrl: '',
  },
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    resetImageUrl: (state) => {
      state.imageUrl = '';
    },
  },
});

export const { setImageUrl, resetImageUrl } = imageSlice.actions;

export default imageSlice.reducer;
