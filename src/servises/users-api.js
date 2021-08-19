import axios from "axios";
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchUsers = async () => {
  const { data } = await axios.get("/users?limit=10");
  return data;
};
const fetchSelectedUser = async (id) => {
  const { data } = await axios.get(`/users/${id}`);
  return data;
};

const fetchLogin = async (user) => {
  const { data } = await axios.post("/auth", user);
  return data;
};

const fetchCurrentAuthUser = async () => {
  const { data } = await axios.get("/auth/user", config);
  return data;
};

const usersApi = {
  fetchLogin,
  fetchCurrentAuthUser,
  fetchSelectedUser,
  fetchUsers,
};

export default usersApi;
