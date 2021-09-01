import usersApi from "../../servises/users-api";
import { userToken } from "../../servises/interseptor";
import { setCurrentAuthUser, setUserToken } from "../users/users.reducer";
import { toast } from "react-toastify";

const signUp = (user) => async (dispatch) => {
  try {
    await usersApi.fetchSignUp(user);
    dispatch(login({ email: user.email, password: user.password }));
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const login = (user) => async (dispatch) => {
  try {
    const { token } = await usersApi.fetchLogin(user);
    dispatch(setUserToken(token));
    localStorage.setItem("token", token);
    userToken.set(token);
    const data = await usersApi.fetchCurrentAuthUser();
    dispatch(setCurrentAuthUser(data));
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const getAuthUser = async () => {
  try {
    const data = await usersApi.fetchCurrentAuthUser();
    setCurrentAuthUser(data);
    return data;
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const getSelectedUser = async (id) => {
  try {
    const data = await usersApi.fetchSelectedUser(id);
    return data;
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const logout = () => (dispatch) => {
  userToken.unset();
  localStorage.removeItem("token");
  dispatch(setCurrentAuthUser({}));
  dispatch(setUserToken(null));
};
const deleteUser = (user) => async (dispatch) => {
  let confirm = prompt(`type YES if you want delete user ${user?.name} `);
  if (confirm === "YES" || confirm === "Yes" || confirm === "yes") {
    try {
      await usersApi.fetchDeleteAuthUser(user._id);
      userToken.unset();
      localStorage.removeItem("token");
      dispatch(setCurrentAuthUser({}));
      dispatch(setUserToken(null));
    } catch (error) {
      toast(`${error.response.data.error[0].message}`);
    }
  }
};
const uploadUserAvatar = (id, avatar) => async (dispatch) => {
  try {
    await usersApi.fetchAddUserAvatar(id, avatar);
    const data = await usersApi.fetchSelectedUser(id);
    dispatch(setCurrentAuthUser(data));
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const editUser = (id, values) => async (dispatch) => {
  try {
    await usersApi.fetchPatchCurrentAuthUser(id, values);
    const data = await usersApi.fetchCurrentAuthUser();
    dispatch(setCurrentAuthUser(data));
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
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
