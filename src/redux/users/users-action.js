import { createAction } from "@reduxjs/toolkit";
// --------------------------------------------------
const setUserTokenRequest = createAction("users/set-token-request");
const setUserTokenSuccess = createAction("users/set-token-success");
const setUserTokenError = createAction("users/set-token-error");
// --------------------------------------------------
const setCurrentAuthUserRequest = createAction(
  "users/set-current-auth-user-request"
);
const setCurrentAuthUserSuccess = createAction(
  "users/set-current-auth-user-success"
);
const setCurrentAuthUserError = createAction(
  "users/set-current-auth-user-error"
);
// --------------------------------------------------
const getAllUsersRequest = createAction("users/get-all-users-request");
const getAllUsersSuccess = createAction("users/get-all-users-success");
const getAllUsersError = createAction("users/get-all-users-error");
// --------------------------------------------------
const setSelectedUserRequest = createAction("users/set-selected-user-request");
const setSelectedUserSuccess = createAction("users/set-selected-user-success");
const setSelectedUserError = createAction("users/set-selected-user-error");
// --------------------------------------------------

const userActions = {
  setUserTokenRequest,
  setUserTokenSuccess,
  setUserTokenError,
  setCurrentAuthUserRequest,
  setCurrentAuthUserSuccess,
  setCurrentAuthUserError,
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersError,
  setSelectedUserRequest,
  setSelectedUserSuccess,
  setSelectedUserError,
};

export default userActions;
