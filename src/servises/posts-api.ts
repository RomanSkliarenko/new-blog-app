import axiosApiInstance from './interseptor';
import IPost from '../common/Post.interface';

type IPostContent = { title: string; fullText: string; description: string };

const fetchAllPosts = async (): Promise<{ data: IPost[] }> => {
  const { data } = await axiosApiInstance.get('/posts?limit=0');
  return data;
};
const fetchCreateNewPost = async (post: IPostContent): Promise<IPost> => {
  const { data } = await axiosApiInstance.post(`/posts`, post);
  return data;
};
const fetchEditPost = async (
  post: IPostContent,
  id: string,
): Promise<IPost> => {
  const { data } = await axiosApiInstance.patch(`/posts/${id}`, post);
  return data;
};
const fetchCurrentPost = async (id: string): Promise<IPost> => {
  const { data } = await axiosApiInstance.get(`/posts/${id}`);
  return data;
};
const fetchPostLike = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosApiInstance.put(`/posts/like/${id}`, {});
  return data;
};
const fetchDeletePost = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosApiInstance.delete(`/posts/${id}`);
  return data;
};
const postsApi = {
  fetchEditPost,
  fetchCreateNewPost,
  fetchPostLike,
  fetchAllPosts,
  fetchCurrentPost,
  fetchDeletePost,
};

export default postsApi;
