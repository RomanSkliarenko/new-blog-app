import { createAction } from "@reduxjs/toolkit";
// -----------------------------------------------
const getAllPostsRequest = createAction("posts/get-all-posts-request");
const getAllPostsSuccess = createAction("posts/get-all-posts-success");
const getAllPostsError = createAction("posts/get-all-posts-error");
// -----------------------------------------------
const setCurrentUserPostsSuccess = createAction(
  "posts/set-current-user-posts-request"
);
const setCurrentUserPostsRequest = createAction(
  "posts/set-current-user-posts-success"
);
const setCurrentUserPostsError = createAction(
  "posts/set-current-user-posts-error"
);
// -----------------------------------------------
const setSelectedPostRequest = createAction("posts/set-selected-post-request");
const setSelectedPostSuccess = createAction("posts/set-selected-post-success");
const setSelectedPostError = createAction("posts/set-selected-post-error");
// -----------------------------------------------

const setSelectedPostCommentsRequest = createAction(
  "posts/set-selected-post-comments-request"
);
const setSelectedPostCommentsSuccess = createAction(
  "posts/set-selected-post-comments-success"
);
const setSelectedPostCommentsError = createAction(
  "posts/set-selected-post-comments-error"
);
// -----------------------------------------------

const postActions = {
  getAllPostsRequest,
  getAllPostsSuccess,
  getAllPostsError,
  setSelectedPostRequest,
  setSelectedPostSuccess,
  setSelectedPostError,
  setSelectedPostCommentsRequest,
  setSelectedPostCommentsSuccess,
  setSelectedPostCommentsError,
  setCurrentUserPostsRequest,
  setCurrentUserPostsSuccess,
  setCurrentUserPostsError,
};
export default postActions;
