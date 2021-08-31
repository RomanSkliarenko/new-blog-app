import postsApi from "../../servises/posts-api";

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

const postsOperations = {
  createNewPost,
  deletePost,
  getCurrentUserPosts,
};
export default postsOperations;
