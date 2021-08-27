import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import usersAction from "./users-action";

const currentAuthUserReducer = createReducer(
  {},
  {
    [usersAction.setCurrentAuthUserSuccess]: (_, { payload }) => payload,
  }
);

const tokenReducer = createReducer(null, {
  [usersAction.setUserTokenSuccess]: (_, { payload }) => payload,
});

const usersReducer = combineReducers({
  currentAuthUser: currentAuthUserReducer,
  token: tokenReducer,
});

export default usersReducer;
