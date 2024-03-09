import { configureStore } from '@reduxjs/toolkit';
import testPrompsReducer from '../features/testPromptsSlice';
import promptsReducer from '../features/promptsSlice';
import imageReducer from '../features/imageSlice';
import coloringToolsReducer from '../features/coloringToolSlice';

export const store = configureStore({
  reducer: {
    testPrompts: testPrompsReducer,
    prompts: promptsReducer,
    image: imageReducer,
    coloringTools: coloringToolsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
