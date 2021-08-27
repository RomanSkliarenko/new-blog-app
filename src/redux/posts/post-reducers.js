// import { combineReducers } from "redux";
// import { createReducer } from "@reduxjs/toolkit";
// import postAction from "./post-actions";

// // const allPostsReducer = createReducer([], {
// //   [postAction.getAllPostsSuccess]: (_, { payload }) => payload,
// // });
// const initialSelPosRedu = {
//   likes: [1, 2, 3],
//   _id: "1",
//   fullText: "1",
//   title: "1",
//   description: "1",
//   followedCommentID: null,
//   dateCreated: "1",
//   postedBy: "1",
// };
// const selectedPostReducer = createReducer(initialSelPosRedu, {
//   [postAction.setSelectedPostSuccess]: (_, { payload }) => payload,
// });

// const currentUserPostsReducer = createReducer(null, {
//   [postAction.setCurrentUserPostsSuccess]: (_, { payload }) => payload,
// });
// const initialSelPosCommRedu = [
//   {
//     likes: [1, 2, 3],
//     _id: "1",
//     text: "1",
//     followedCommentID: null,
//     dateCreated: "1",
//     commentedBy: "1",
//     postID: "1",
//     __v: 1,
//   },
// ];
// const selectedPostCommentsReducer = createReducer(initialSelPosCommRedu, {
//   [postAction.setSelectedPostCommentsSuccess]: (_, { payload }) => payload,
// });

// const postsLoaderReducer = createReducer(false, {
//   [postAction.setSelectedPostCommentsRequest]: (_, __) => true,
//   [postAction.setSelectedPostCommentsSuccess]: (_, __) => false,
//   [postAction.setSelectedPostCommentsError]: (_, __) => false,
//   [postAction.getAllPostsRequest]: (_, __) => true,
//   [postAction.getAllPostsSuccess]: (_, __) => false,
//   [postAction.getAllPostsError]: (_, __) => false,
//   [postAction.setSelectedPostRequest]: (_, __) => true,
//   [postAction.setSelectedPostSuccess]: (_, __) => false,
//   [postAction.setSelectedPostError]: (_, __) => false,
//   [postAction.setCurrentUserPostsRequest]: (_, __) => true,
//   [postAction.setCurrentUserPostsSuccess]: (_, __) => false,
//   [postAction.setCurrentUserPostsError]: (_, __) => false,
// });

// const postsReducer = combineReducers({
//   // allPosts: allPostsReducer,
//   selectedPost: selectedPostReducer,
//   selectedPostComments: selectedPostCommentsReducer, //comments for current post
//   currentUserPosts: currentUserPostsReducer,
//   postsLoader: postsLoaderReducer,
// });

// export default postsReducer;
