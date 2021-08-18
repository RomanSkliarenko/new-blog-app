import { combineReducers } from "redux";
import usersActionTypes from "./users-action-types";

const currentAuthUserReducer = (state = null, { type, payload }) => {
  switch (type) {
    case usersActionTypes.getCurrentAuthUser:
      return payload;
    case usersActionTypes.removeCurrentAuthUser:
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

const selectedUserReducer = (state = null, { type, payload }) => {
  switch (type) {
    case usersActionTypes.setSelectedUser:
      return payload;

    default:
      return state;
  }
};

const usersReducer = combineReducers({
  currentAuthUser: currentAuthUserReducer,
  allUsers: allUsersReducer,
  token: tokenReducer,
  selectedUser: selectedUserReducer,
});

export default usersReducer;
