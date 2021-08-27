import axiosApiInstance from "../servises/interseptor";

axiosApiInstance.defaults.baseURL =
  "https://nodejs-test-api-blog.herokuapp.com/api/v1";

const fetchUsers = async () => {
  const { data } = await axiosApiInstance.get("/users?limit=0");
  return data;
};
const fetchAddUserAvatar = async (id, avatar) => {
  const fd = new FormData();
  fd.append("avatar", avatar, avatar.name);
  const { data } = await axiosApiInstance.put(`/users/upload/${id}`, fd, {
    headers: {
      "Content-Type": `multipart/form-data; `,
    },
  });
  return data;
};
const fetchSelectedUser = async (id) => {
  const { data } = await axiosApiInstance.get(`/users/${id}`);
  return data;
};

const fetchLogin = async (user) => {
  const { data } = await axiosApiInstance.post("/auth", user);
  return data;
};

const fetchCurrentAuthUser = async () => {
  const { data } = await axiosApiInstance.get("/auth/user");
  return data;
};
const fetchPatchCurrentAuthUser = async (id, credential) => {
  const { data } = await axiosApiInstance.patch(`/users/${id}`, credential);
  return data;
};
const fetchDeleteAuthUser = async (id) => {
  const { data } = await axiosApiInstance.delete(`/users/${id}`);
  return data;
};

const usersApi = {
  fetchAddUserAvatar,
  fetchPatchCurrentAuthUser,
  fetchDeleteAuthUser,
  fetchLogin,
  fetchCurrentAuthUser,
  fetchSelectedUser,
  fetchUsers,
};

export default usersApi;
