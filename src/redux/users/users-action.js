import { createAction } from "@reduxjs/toolkit";

const setUserToken = createAction("users/set-token");
const setCurrentAuthUser = createAction("users/set-current-auth-user");
const getAllUsers = createAction("users/get-all-users");
const setSelectedUser = createAction("users/set-selected-user");

const userActions = {
  setUserToken,
  setCurrentAuthUser,
  getAllUsers,
  setSelectedUser,
};

export default userActions;
