const GET_ALL_POSTS = "posts/get-all-posts";
const GET_SELECTED_POST = "posts/get-selected-post";
const GET_CURRENT_USER_POSTS = "posts/get-current-user-posts";
const GET_SELECTED_POST_COMMENTS = "posts/get-selected-post-comments";
const ADD_COMMENT_TO_SELECTED_POST = "posts/add-comment-to-selected-post";
const DELETE_COMMENT_FROM_SELECTED_POST =
  "posts/delete-comment-from-selected-post";

const postActionTypes = {
  getAllPosts: GET_ALL_POSTS,
  getSelectedPost: GET_SELECTED_POST,
  getCurrentUserPosts: GET_CURRENT_USER_POSTS,
  getSelectedPostComments: GET_SELECTED_POST_COMMENTS,
  addCommentToSelectedPost: ADD_COMMENT_TO_SELECTED_POST,
  deleteCommentFromSelectedPost: DELETE_COMMENT_FROM_SELECTED_POST,
};
export default postActionTypes;
