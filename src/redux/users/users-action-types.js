const GET_USER_TOKEN = "users/get-token";
const REMOVE_USER_TOKEN = "users/remove-token";
const GET_USER = "users/get-user";
const REMOVE_USER = "users/remove-user";
const GET_ALL_USERS = "users/get-all-users";

const usersActionTypes = {
  getUserToken: GET_USER_TOKEN,
  removeUserToken: REMOVE_USER_TOKEN,
  getUser: GET_USER,
  removeUser: REMOVE_USER,
  getAllUsers: GET_ALL_USERS,
};

export default usersActionTypes;
