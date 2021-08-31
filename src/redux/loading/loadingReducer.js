import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    startLoad(state, { payload }) {
      state = payload;
    },
    endLoad(state, { payload }) {
      state = payload;
    },
  },
});

export const { startLoad, endLoad } = loadingSlice.actions;
export default loadingSlice.reducer;
