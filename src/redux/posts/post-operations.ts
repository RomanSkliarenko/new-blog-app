import axios, { AxiosPromise } from 'axios';
import postsApi from '../../servises/posts-api';
import IPost from '../../common/Post.interface';
import IPostFields from '../../common/PostFields.interface';
import { toast } from 'react-toastify';

const getAllPosts: () => Promise<IPost[]> = async () => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const getSelectedPost: (id: string) => Promise<IPost> = async id => {
  try {
    const data = await postsApi.fetchCurrentPost(id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const editPost: (values: IPostFields, id: string) => Promise<IPost> = async (
  post,
  id,
) => {
  try {
    const data = await postsApi.fetchEditPost(post, id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const createNewPost: (values: IPostFields) => Promise<IPost[]> = async post => {
  try {
    await postsApi.fetchCreateNewPost(post);
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const deletePost: (postId: string, userId: string) => Promise<IPost[]> = async (
  postId,
  userId,
) => {
  try {
    await postsApi.fetchDeletePost(postId);
    const { data } = await postsApi.fetchAllPosts();
    return data.filter((post: IPost) => post.postedBy === userId);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const getCurrentUserPosts: (id: string) => Promise<IPost[]> = async id => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data.filter((post: IPost) => post.postedBy === id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const setPostLike: (id: string) => Promise<AxiosPromise> = async id => {
  try {
    const data = await postsApi.fetchPostLike(id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};

const postsOperations = {
  editPost,
  getAllPosts,
  getSelectedPost,
  createNewPost,
  deletePost,
  getCurrentUserPosts,
  setPostLike,
};
export default postsOperations;
