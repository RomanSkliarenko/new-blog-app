import { AppDispatch } from '../store';
import usersApi from '../../servises/users-api';
import { userToken } from '../../servises/interseptor';
import { setCurrentAuthUser, setUserToken } from './users.reducer';
import { toast } from 'react-toastify';
import IUser from '../../common/User.interface';
import axios from 'axios';

type IAuthFn = (user: {
  email: string;
  password: string;
}) => (dispatch: AppDispatch) => void;

const login: IAuthFn = user => async dispatch => {
  try {
    const { token } = await usersApi.fetchLogin(user);
    dispatch(setUserToken(token));
    localStorage.setItem('token', token);
    userToken.set(token);
    const data = await usersApi.fetchCurrentAuthUser();
    dispatch(setCurrentAuthUser(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const signUp: IAuthFn = user => async dispatch => {
  try {
    await usersApi.fetchSignUp(user);
    dispatch(login(user));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const getAuthUser: () => Promise<IUser> = async () => {
  try {
    const data = await usersApi.fetchCurrentAuthUser();
    setCurrentAuthUser(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const getSelectedUser: (id: string) => Promise<IUser> = async id => {
  try {
    const data = await usersApi.fetchSelectedUser(id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const logout: () => (dispatch: AppDispatch) => void = () => dispatch => {
  userToken.unset();
  localStorage.removeItem('token');
  dispatch(setCurrentAuthUser(null));
  dispatch(setUserToken(null));
};
const deleteUser: (user: IUser) => (dispatch: AppDispatch) => void =
  user => async dispatch => {
    const confirm = prompt(`type YES if you want delete user ${user?.name} `); // eslint-disable-line no-alert
    if (confirm === 'YES' || confirm === 'Yes' || confirm === 'yes') {
      try {
        await usersApi.fetchDeleteAuthUser(user._id!);
        userToken.unset();
        localStorage.removeItem('token');
        dispatch(setCurrentAuthUser(null));
        dispatch(setUserToken(null));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast(`${error?.response?.data.error[0].message}`);
        }
      }
    }
  };
const uploadUserAvatar: (
  id: string,
  avatar: File,
) => (dispatch: AppDispatch) => void = (id, avatar) => async dispatch => {
  try {
    await usersApi.fetchAddUserAvatar(id, avatar);
    const data = await usersApi.fetchSelectedUser(id);
    dispatch(setCurrentAuthUser(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const editUser: (
  id: string,
  values: {
    name: string;
    extra_details: string;
    skills: string;
    profession: string;
    details: string;
  },
) => (dispatch: AppDispatch) => void = (id, values) => async dispatch => {
  try {
    await usersApi.fetchPatchCurrentAuthUser(id, values);
    const data = await usersApi.fetchCurrentAuthUser();
    dispatch(setCurrentAuthUser(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};

const usersOperations = {
  signUp,
  login,
  getAuthUser,
  editUser,
  uploadUserAvatar,
  logout,
  deleteUser,
  getSelectedUser,
};
export default usersOperations;
