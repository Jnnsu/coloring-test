import { createSlice } from '@reduxjs/toolkit';

export const coloringToolSlice = createSlice({
  name: 'coloringTool',
  initialState: {
    color: '#fff',
    tool: 'brush',
    brushSize: 10,
  },
  reducers: {
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    setBrushSize: (state, action) => {
      state.brushSize = action.payload;
    },
  },
});

// actions와 reducer를 export
export const { setColor, setTool, setBrushSize } = coloringToolSlice.actions;

export default coloringToolSlice.reducer;
