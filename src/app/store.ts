import { configureStore } from '@reduxjs/toolkit';
import promptsReducer from '../features/promptsSlice';
import imageReducer from '../features/imageSlice';
import coloringToolsReducer from '../features/coloringToolSlice';

export const store = configureStore({
  reducer: {
    prompts: promptsReducer,
    image: imageReducer,
    coloringTools: coloringToolsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
