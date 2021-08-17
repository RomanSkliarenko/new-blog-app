import { combineReducers } from "redux";
import usersActionTypes from "./users-action-types";

const userReducer = (state = null, { type, payload }) => {
  switch (type) {
    case usersActionTypes.getUser:
      return payload;
    case usersActionTypes.removeUser:
      return payload;
    default:
      return state;
  }
};
const allUsersReducer = (state = null, { type, payload }) => {
  switch (type) {
    case usersActionTypes.getAllUsers:
      return payload;
    default:
      return state;
  }
};

const tokenReducer = (state = null, { type, payload }) => {
  switch (type) {
    case usersActionTypes.getUserToken:
      return payload;
    case usersActionTypes.removeUserToken:
      return payload;
    default:
      return state;
  }
};

const usersReducer = combineReducers({
  currentUser: userReducer,
  allUsers: allUsersReducer,
  token: tokenReducer,
});

export default usersReducer;
