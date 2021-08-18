const GET_USER_TOKEN = "users/get-token";
const REMOVE_USER_TOKEN = "users/remove-token";
const GET_CURRENT_AUTH_USER = "users/get-current-auth-user";
const REMOVE_CURRENT_AUTH_USER = "users/remove-current-auth-user";
const GET_ALL_USERS = "users/get-all-users";
const SET_SELECTED_USER = "users/set-selected-user";

const usersActionTypes = {
  getUserToken: GET_USER_TOKEN,
  removeUserToken: REMOVE_USER_TOKEN,
  getCurrentAuthUser: GET_CURRENT_AUTH_USER,
  removeCurrentAuthUser: REMOVE_CURRENT_AUTH_USER,
  getAllUsers: GET_ALL_USERS,
  setSelectedUser: SET_SELECTED_USER,
};

export default usersActionTypes;
