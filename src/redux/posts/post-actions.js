import { createAction } from "@reduxjs/toolkit";

const getAllPosts = createAction("posts/get-all-posts");
const setCurrentUserPosts = createAction("posts/set-current-user-posts");
const setSelectedPost = createAction("posts/set-selected-post");
const setSelectedPostComments = createAction(
  "posts/set-selected-post-comments"
);

const postActions = {
  getAllPosts,
  setSelectedPost,
  setSelectedPostComments,
  setCurrentUserPosts,
};
export default postActions;
