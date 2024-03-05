import { configureStore } from '@reduxjs/toolkit';
import promptsReducer from '../features/promptsSlice';
import imageReducer from '../features/imageSlice';

export const store = configureStore({
  reducer: {
    prompts: promptsReducer,
    image: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
