import { createSlice } from "@reduxjs/toolkit";

const currentAuthUserSlice = createSlice({
  name: "currentAuthUser",
  initialState: { user: {}, token: null },
  reducers: {
    setCurrentAuthUser(state, action) {
      const { payload } = action;
      state.user = payload;
    },
    setUserToken(state, action) {
      const { payload } = action;
      state.token = payload;
    },
    logoutUser() {},
  },
});

export const { setCurrentAuthUser, setUserToken } =
  currentAuthUserSlice.actions;
export default currentAuthUserSlice.reducer;
