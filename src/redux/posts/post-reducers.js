import { combineReducers } from "redux";
import postActionTypes from "./post-action-types";

const allPostsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case postActionTypes.getAllPosts:
      return payload;

    default:
      return state;
  }
};

const selectedPostReducer = (state = null, { type, payload }) => {
  switch (type) {
    case postActionTypes.getSelectedPost:
      return payload;
    case postActionTypes.removeSelectedPost:
      return payload;

    default:
      return state;
  }
};

const currentUserPostsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case postActionTypes.getCurrentUserPosts:
      return payload;

    default:
      return state;
  }
};

const postsReducer = combineReducers({
  allPosts: allPostsReducer,
  selectedPost: selectedPostReducer,
  currentUserPosts: currentUserPostsReducer,
});

export default postsReducer;
