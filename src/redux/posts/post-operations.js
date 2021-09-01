import postsApi from "../../servises/posts-api";

const getAllPosts = async () => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error) {
    alert(error);
  }
};
const getSelectedPost = async (id) => {
  try {
    const data = await postsApi.fetchCurrentPost(id);
    return data;
  } catch (error) {
    alert(error);
  }
};
const editPost = async (post, id) => {
  try {
    const data = await postsApi.fetchEditPost(post, id);
    return data;
  } catch (error) {
    alert(error);
  }
};
const createNewPost = async (post) => {
  try {
    await postsApi.fetchCreateNewPost(post);
    const { data } = await postsApi.fetchAllPosts();
    return data;
  } catch (error) {
    alert(error);
  }
};
const deletePost = async (postId, userId) => {
  try {
    await postsApi.fetchDeletePost(postId);
    const { data } = await postsApi.fetchAllPosts();
    return data.filter((post) => post.postedBy === userId);
  } catch (error) {
    alert(error);
  }
};
const getCurrentUserPosts = async (id) => {
  try {
    const { data } = await postsApi.fetchAllPosts();
    return data.filter((post) => post.postedBy === id);
  } catch (error) {
    alert(error);
  }
};
const setPostLike = async (id) => {
  try {
    const data = await postsApi.fetchPostLike(id);
    return data;
  } catch (error) {
    alert(error);
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
