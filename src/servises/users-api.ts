import axiosApiInstance from './interseptor';
import IUser from '../common/User.interface';

const fetchUsers = async () => {
  const { data } = await axiosApiInstance.get('/users?limit=0');
  return data;
};
const fetchSignUp = async (user: IUser) => {
  const { data } = await axiosApiInstance.post('/users', user);
  return data;
};
const fetchAddUserAvatar = async (id: string, avatar: File) => {
  const fd = new FormData();
  fd.append('avatar', avatar, avatar.name);
  const { data } = await axiosApiInstance.put(`/users/upload/${id}`, fd, {
    headers: {
      'Content-Type': `multipart/form-data; `,
    },
  });
  return data;
};
const fetchSelectedUser = async (id: string) => {
  const { data } = await axiosApiInstance.get(`/users/${id}`);
  return data;
};
const fetchLogin = async (user: IUser) => {
  const { data } = await axiosApiInstance.post('/auth', user);
  return data;
};
const fetchCurrentAuthUser = async () => {
  const { data } = await axiosApiInstance.get('/auth/user');
  return data;
};
const fetchPatchCurrentAuthUser = async (
  id: string,
  credential: {
    name: string;
    extra_details: string;
    skills: string;
    profession: string;
    details: string;
  },
) => {
  const { data } = await axiosApiInstance.patch(`/users/${id}`, credential);
  return data;
};
const fetchDeleteAuthUser = async (id: string) => {
  const { data } = await axiosApiInstance.delete(`/users/${id}`);
  return data;
};

const usersApi = {
  fetchSignUp,
  fetchAddUserAvatar,
  fetchPatchCurrentAuthUser,
  fetchDeleteAuthUser,
  fetchLogin,
  fetchCurrentAuthUser,
  fetchSelectedUser,
  fetchUsers,
};

export default usersApi;
