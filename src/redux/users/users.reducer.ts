import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IUser = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  extra_details: string;
  skills: string;
  profession: string;
  details: string;
  dateCreated: string;
};

interface IToken {
  payload: string;
}

interface IInitialState {
  user: IUser | null;
  token: string | null;
}
const initialState: IInitialState = { user: null, token: null };

const currentAuthUserSlice = createSlice({
  name: 'currentAuthUser',
  initialState,
  reducers: {
    setCurrentAuthUser(state, { payload }: PayloadAction<IUser | null>) {
      state.user = payload;
    },
    setUserToken(state, { payload }: PayloadAction<string | null>) {
      state.token = payload;
    },
    logoutUser() {},
  },
});

export const { setCurrentAuthUser, setUserToken } =
  currentAuthUserSlice.actions;
export default currentAuthUserSlice.reducer;
