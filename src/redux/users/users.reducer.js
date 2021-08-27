import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import usersAction from "./users-action";

const currentAuthUserReducer = createReducer(
  {},
  {
    [usersAction.setCurrentAuthUserSuccess]: (_, { payload }) => payload,
  }
);

const allUsersReducer = createReducer([], {
  [usersAction.getAllUsersSuccess]: (_, { payload }) => payload,
});

const tokenReducer = createReducer(null, {
  [usersAction.setUserTokenSuccess]: (_, { payload }) => payload,
});

const selectedUserReducer = createReducer(null, {
  [usersAction.setSelectedUserSuccess]: (_, { payload }) => payload,
});

const userLoaderReducer = createReducer(false, {
  [usersAction.setUserTokenRequest]: (_, __) => true,
  [usersAction.setUserTokenSuccess]: (_, __) => false,
  [usersAction.setUserTokenError]: (_, __) => false,
  [usersAction.setCurrentAuthUserRequest]: (_, __) => true,
  [usersAction.setCurrentAuthUserSuccess]: (_, __) => false,
  [usersAction.setCurrentAuthUserError]: (_, __) => false,
  [usersAction.getAllUsersRequest]: (_, __) => true,
  [usersAction.getAllUsersSuccess]: (_, __) => false,
  [usersAction.getAllUsersError]: (_, __) => false,
  [usersAction.setSelectedUserRequest]: (_, __) => true,
  [usersAction.setSelectedUserSuccess]: (_, __) => false,
  [usersAction.setSelectedUserError]: (_, __) => false,
});

const usersReducer = combineReducers({
  currentAuthUser: currentAuthUserReducer,
  allUsers: allUsersReducer,
  token: tokenReducer,
  selectedUser: selectedUserReducer,
  usersLoader: userLoaderReducer,
});

export default usersReducer;
