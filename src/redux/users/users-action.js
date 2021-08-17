import usersActionTypes from "./users-action-types";

const getUserToken = (token) => ({
  type: usersActionTypes.getUserToken,
  payload: token,
});

const removeUserToken = () => ({
  type: usersActionTypes.removeUserToken,
  payload: null,
});

const getUser = (user) => ({
  type: usersActionTypes.getUser,
  payload: user,
});

const removeUser = () => ({
  type: usersActionTypes.removeUser,
  payload: null,
});

const getAllUsers = (users) => ({
  type: usersActionTypes.getAllUsers,
  payload: users,
});

const userActions = {
  getUserToken,
  removeUserToken,
  getUser,
  removeUser,
  getAllUsers,
};

export default userActions;
