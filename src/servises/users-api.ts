import axiosApiInstance from './interseptor';
import IUserFields from '../common/UserFields.interface';
import IUser from '../common/User.interface';

const fetchUsers = async (): Promise<{ data: IUser[] }> => {
  const { data } = await axiosApiInstance.get('/users?limit=0');
  return data;
};
const fetchSignUp = async (user: IUserFields): Promise<IUser> => {
  const { data } = await axiosApiInstance.post('/users', user);
  return data;
};
const fetchAddUserAvatar = async (id: string, avatar: File): Promise<IUser> => {
  const fd = new FormData();
  fd.append('avatar', avatar, avatar.name);
  const { data } = await axiosApiInstance.put(`/users/upload/${id}`, fd, {
    headers: {
      'Content-Type': `multipart/form-data; `,
    },
  });
  return data;
};
const fetchSelectedUser = async (id: string): Promise<IUser> => {
  const { data } = await axiosApiInstance.get(`/users/${id}`);
  return data;
};
const fetchLogin = async (user: IUserFields): Promise<{ token: string }> => {
  const { data } = await axiosApiInstance.post('/auth', user);
  return data;
};
const fetchCurrentAuthUser = async (): Promise<IUser> => {
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
): Promise<IUser> => {
  const { data } = await axiosApiInstance.patch(`/users/${id}`, credential);
  return data;
};
const fetchDeleteAuthUser = async (
  id: string,
): Promise<{ message: string }> => {
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
