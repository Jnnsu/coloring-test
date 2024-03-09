// features/imageSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const imageSlice = createSlice({
  name: 'image',
  initialState: {
    imageURL: '',
  },
  reducers: {
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
    resetImageURL: (state) => {
      state.imageURL = '';
    },
  },
});

export const { setImageURL, resetImageURL } = imageSlice.actions;

export default imageSlice.reducer;
