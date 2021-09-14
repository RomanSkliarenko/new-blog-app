import axios from 'axios';
import postsApi from '../../servises/posts-api';
import IPost from '../../common/Post.interface';
import IPostFields from '../../common/PostFields.interface';
import { toast } from 'react-toastify';

type Nothing = undefined;

const getAllPosts = async (): Promise<IPost[] | Nothing> => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const getSelectedPost = async (id: string): Promise<IPost | Nothing> => {
  try {
    const data = await postsApi.fetchCurrentPost(id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const editPost = async (
  post: IPostFields,
  id: string,
): Promise<IPost | Nothing> => {
  try {
    const data = await postsApi.fetchEditPost(post, id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const createNewPost = async (post: IPostFields): Promise<IPost[] | Nothing> => {
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
const deletePost = async (
  postId: string,
  userId: string,
): Promise<IPost[] | Nothing> => {
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
const deletePostFromAll = async (
  postId: string,
): Promise<IPost[] | Nothing> => {
  try {
    await postsApi.fetchDeletePost(postId);
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const getCurrentUserPosts = async (id: string): Promise<IPost[] | Nothing> => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data.filter((post: IPost) => post.postedBy === id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const setPostLike: (id: string) => Promise<{ message: string } | Nothing> =
  async id => {
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
  deletePostFromAll,
};
export default postsOperations;
