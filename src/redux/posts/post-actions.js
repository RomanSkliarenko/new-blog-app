import postActionTypes from "./post-action-types";

const getAllPosts = (posts) => ({
  type: postActionTypes.getAllPosts,
  payload: posts,
});
const getSelectedPost = (post) => ({
  type: postActionTypes.getSelectedPost,
  payload: post,
});
const getCurrentUserPosts = (post) => ({
  type: postActionTypes.getCurrentUserPosts,
  payload: post,
});

const postActions = {
  getAllPosts,
  getSelectedPost,
  getCurrentUserPosts,
};
export default postActions;
