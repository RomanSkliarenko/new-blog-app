import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import postAction from "./post-actions";

const allPostsReducer = createReducer([], {
  [postAction.getAllPosts]: (_, { payload }) => payload,
});
const initialSelPosRedu = {
  likes: [1, 2, 3],
  _id: "1",
  fullText: "1",
  title: "1",
  description: "1",
  followedCommentID: null,
  dateCreated: "1",
  postedBy: "1",
};
const selectedPostReducer = createReducer(initialSelPosRedu, {
  [postAction.setSelectedPost]: (_, { payload }) => payload,
});

const currentUserPostsReducer = createReducer(null, {
  [postAction.setCurrentUserPosts]: (_, { payload }) => payload,
});
const initialSelPosCommRedu = [
  {
    likes: [1, 2, 3],
    _id: "1",
    text: "1",
    followedCommentID: null,
    dateCreated: "1",
    commentedBy: "1",
    postID: "1",
    __v: 1,
  },
];
const selectedPostCommentsReducer = createReducer(initialSelPosCommRedu, {
  [postAction.setSelectedPostComments]: (_, { payload }) => payload,
});

const postsReducer = combineReducers({
  allPosts: allPostsReducer,
  selectedPost: selectedPostReducer,
  selectedPostComments: selectedPostCommentsReducer, //comments for current post
  currentUserPosts: currentUserPostsReducer,
});

export default postsReducer;
