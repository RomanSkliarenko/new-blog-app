import usersActionTypes from "./users-action-types";

const getUserToken = (token) => ({
  type: usersActionTypes.getUserToken,
  payload: token,
});

const removeUserToken = () => ({
  type: usersActionTypes.removeUserToken,
  payload: null,
});

const getCurrentAuthUser = (user) => ({
  type: usersActionTypes.getCurrentAuthUser,
  payload: user,
});

const removeCurrentAuthUser = () => ({
  type: usersActionTypes.removeCurrentAuthUser,
  payload: null,
});

const getAllUsers = (users) => ({
  type: usersActionTypes.getAllUsers,
  payload: users,
});
const setSelectedUser = (user) => ({
  type: usersActionTypes.setSelectedUser,
  payload: user,
});

const userActions = {
  getUserToken,
  removeUserToken,
  getCurrentAuthUser,
  removeCurrentAuthUser,
  getAllUsers,
  setSelectedUser,
};

export default userActions;
