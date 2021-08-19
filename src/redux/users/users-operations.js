import usersApi from "../../servises/users-api";
import userActions from "../users/users-action";

const getAllUsers = () => (dispatch) => {
  usersApi
    .fetchUsers()
    .then(function (data) {
      dispatch(userActions.getAllUsers(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const setSelectedUser = (id) => (dispatch) => {
  usersApi
    .fetchSelectedUser(id)
    .then(function (data) {
      dispatch(userActions.setSelectedUser(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const login = (user) => async (dispatch) => {
  await usersApi
    .fetchLogin(user)
    .then(function ({ token }) {
      dispatch(userActions.setUserToken(token));
      localStorage.setItem("token", token);
      return token;
    })
    .catch(function (error) {
      console.log(error);
    });
  await usersApi
    .fetchCurrentAuthUser()
    .then(function (data) {
      dispatch(userActions.setCurrentAuthUser(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const usersOperations = {
  login,
  getAllUsers,
  setSelectedUser,
};
export default usersOperations;
