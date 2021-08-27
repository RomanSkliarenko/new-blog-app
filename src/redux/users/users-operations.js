import axios from "axios";
import usersApi from "../../servises/users-api";
import userActions from "../users/users-action";
const userToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(token) {
    axios.defaults.headers.common.Authorization = ``;
  },
};

const login = (user) => async (dispatch) => {
  dispatch(userActions.setUserTokenRequest());
  await usersApi
    .fetchLogin(user)
    .then(function ({ token }) {
      dispatch(userActions.setUserTokenSuccess(token));
      localStorage.setItem("token", token);
      userToken.set(token);
      dispatch(userActions.setCurrentAuthUserRequest());
      usersApi
        .fetchCurrentAuthUser()
        .then(function (data) {
          dispatch(userActions.setCurrentAuthUserSuccess(data));
        })
        .catch(function (error) {
          dispatch(userActions.setCurrentAuthUserError());
          console.log(error);
        });
    })
    .catch(function (error) {
      dispatch(userActions.setUserTokenError());
      console.log(error);
    });
};
const logout = () => async (dispatch) => {
  userToken.unset();
  localStorage.removeItem("token");
  dispatch(userActions.setCurrentAuthUserSuccess({}));
  dispatch(userActions.setUserTokenSuccess(null));
};

const usersOperations = {
  login,
  logout,
};
export default usersOperations;