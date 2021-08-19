import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import usersAction from "./users-action";

const currentAuthUserReducer = createReducer(null, {
  [usersAction.setCurrentAuthUser]: (_, { payload }) => payload,
});

const allUsersReducer = createReducer(null, {
  [usersAction.getAllUsers]: (_, { payload }) => payload,
});

const tokenReducer = createReducer(null, {
  [usersAction.setUserToken]: (_, { payload }) => payload,
});

const selectedUserReducer = createReducer(null, {
  [usersAction.setSelectedUser]: (_, { payload }) => payload,
});

const usersReducer = combineReducers({
  currentAuthUser: currentAuthUserReducer,
  allUsers: allUsersReducer,
  token: tokenReducer,
  selectedUser: selectedUserReducer,
});

export default usersReducer;
