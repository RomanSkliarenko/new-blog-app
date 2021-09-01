import postsApi from "../../servises/posts-api";
import { toast } from "react-toastify";

const getAllPosts = async () => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const getSelectedPost = async (id) => {
  try {
    const data = await postsApi.fetchCurrentPost(id);
    return data;
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const editPost = async (post, id) => {
  try {
    const data = await postsApi.fetchEditPost(post, id);
    return data;
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const createNewPost = async (post) => {
  try {
    await postsApi.fetchCreateNewPost(post);
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const deletePost = async (postId, userId) => {
  try {
    await postsApi.fetchDeletePost(postId);
    const { data } = await postsApi.fetchAllPosts();
    return data.filter((post) => post.postedBy === userId);
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const getCurrentUserPosts = async (id) => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data.filter((post) => post.postedBy === id);
  } catch (error) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const setPostLike = async (id) => {
  try {
    const data = await postsApi.fetchPostLike(id);
    return data;
  } catch (error) {
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
