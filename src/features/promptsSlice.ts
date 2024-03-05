import { createSlice } from '@reduxjs/toolkit';

export const promptsSlice = createSlice({
  name: 'prompts',
  initialState: {
    promptA: '',
    promptB: '',
    promptC: '',
  },
  reducers: {
    setPromptA: (state, action) => {
      state.promptA = action.payload;
    },
    setPromptB: (state, action) => {
      state.promptB = action.payload;
    },
    setPromptC: (state, action) => {
      state.promptC = action.payload;
    },
  },
});

// actions와 reducer를 export
export const { setPromptA, setPromptB, setPromptC } = promptsSlice.actions;

export default promptsSlice.reducer;
