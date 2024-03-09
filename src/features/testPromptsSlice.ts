import { createSlice } from '@reduxjs/toolkit';

export const testPromptSlice = createSlice({
  name: 'testPrompts',
  initialState: {
    promptDefault: '',
    promptA: '',
    promptB: '',
    promptC: '',
  },
  reducers: {
    setPromptDefault: (state, action) => {
      state.promptDefault = action.payload;
    },
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
export const { setPromptDefault, setPromptA, setPromptB, setPromptC } =
  testPromptSlice.actions;

export default testPromptSlice.reducer;
