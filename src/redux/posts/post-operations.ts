import postsApi from '../../servises/posts-api';
import { toast } from 'react-toastify';
import IPost from '../../common/Post.interface';

type Ifn = (id: string) => Promise<IPost[]>;

const getAllPosts = async () => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const getSelectedPost: (id: string) => Promise<IPost> = async id => {
  try {
    const data = await postsApi.fetchCurrentPost(id);
    return data;
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const editPost: (
  values: {
    title: string;
    fullText: string;
    description: string;
  },
  id: string,
) => Promise<any> = async (post, id) => {
  try {
    const data = await postsApi.fetchEditPost(post, id);
    return data;
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const createNewPost: (values: {
  title: string;
  fullText: string;
  description: string;
}) => Promise<any> = async post => {
  try {
    await postsApi.fetchCreateNewPost(post);
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
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
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const getCurrentUserPosts: Ifn = async id => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data.filter((post: IPost) => post.postedBy === id);
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const setPostLike: Ifn = async id => {
  try {
    const data = await postsApi.fetchPostLike(id);
    return data;
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
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
