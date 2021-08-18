import postActionTypes from "./post-action-types";

const getAllPosts = (posts) => ({
  type: postActionTypes.getAllPosts,
  payload: posts,
});
const getSelectedPost = (post) => ({
  type: postActionTypes.getSelectedPost,
  payload: post,
});
const getSelectedPostComments = (comments) => ({
  type: postActionTypes.getSelectedPostComments,
  payload: comments,
});
const addCommentToSelectedPost = (comment) => ({
  type: postActionTypes.addCommentToSelectedPost,
  payload: comment,
});
const deleteCommentFromSelectedPost = (id) => ({
  type: postActionTypes.deleteCommentFromSelectedPost,
  payload: id,
});
const getCurrentUserPosts = (post) => ({
  type: postActionTypes.getCurrentUserPosts,
  payload: post,
});
//getSelectedPostComments

const postActions = {
  getAllPosts,
  getSelectedPost,
  getSelectedPostComments,
  addCommentToSelectedPost,
  deleteCommentFromSelectedPost,
  getCurrentUserPosts,
};
export default postActions;
