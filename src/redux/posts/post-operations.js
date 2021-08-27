import postsApi from "../../servises/posts-api";
import postsActions from "../posts/post-actions";

const getAllPosts = () => (dispatch) => {
  dispatch(postsActions.getAllPostsRequest());
  postsApi
    .fetchAllPosts()
    .then(function (data) {
      dispatch(postsActions.getAllPostsSuccess(data));
    })
    .catch(function (error) {
      dispatch(postsActions.getAllPostsError());
      console.log(error);
    });
};
const getCurrentPost = (id) => (dispatch) => {
  dispatch(postsActions.setSelectedPostRequest());
  postsApi
    .fetchCurrentPost(id)
    .then(function (data) {
      dispatch(postsActions.setSelectedPostSuccess(data));
    })
    .catch(function (error) {
      dispatch(postsActions.setSelectedPostError());
      console.log(error);
    });
};
const setCurrentUserPosts = (posts, id) => (dispatch) => {
  dispatch(postsActions.setCurrentUserPostsRequest());
  const myPosts = posts.filter((post) => post.postedBy === id);
  if (myPosts) {
    dispatch(postsActions.setCurrentUserPostsSuccess(myPosts));
  } else {
    dispatch(postsActions.setCurrentUserPostsError());
  }
};
const deletePost = (id) => async (dispatch) => {
  await postsApi
    .fetchDeletePost(id)
    .then(function (_) {
      // alert("Delete success");
      // postsApi
      //   .fetchAllPosts()
      //   .then(function (data) {
      //     dispatch(postsActions.getAllPosts(data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    })
    .catch(function (error) {
      console.log(error);
    });
  // await postsApi
  //   .fetchAllPosts()
  //   .then(function (data) {
  //     dispatch(postsActions.getAllPosts(data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
};
const getCurrentPostComments = (id) => (dispatch) => {
  dispatch(postsActions.setSelectedPostCommentsRequest());
  postsApi
    .fetchCurrentPostComments(id)
    .then(function (data) {
      dispatch(postsActions.setSelectedPostCommentsSuccess(data));
    })
    .catch(function (error) {
      dispatch(postsActions.setSelectedPostCommentsError());
      console.log(error);
    });
};
const deleteCommentFromSelectedPost = (commentId, postId) => (dispatch) => {
  postsApi
    .fetchDeleteCommentFromSelectedPost(commentId)
    .then(function (data) {
      dispatch(postsOperations.getCurrentPostComments(postId));
    })
    .catch(function (error) {
      console.log(error);
    });
};
// const setCommentLike = (commentId, postId) => (dispatch) => {
//   postsApi
//     .fetchCommentLike(commentId)
//     .then(function (_) {
//       dispatch(postsOperations.getCurrentPostComments(postId));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };
const createNewPost = (post) => async (dispatch) => {
  await postsApi
    .fetchCreateNewPost(post)
    .then(function (_) {
      // alert("success");
    })
    .catch(function (error) {
      alert("fail");
      console.log(error);
    });
  await postsApi
    .fetchAllPosts()
    .then(function (data) {
      // dispatch(postsActions.getAllPosts(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const postsOperations = {
  createNewPost,
  getAllPosts,
  deletePost,
  getCurrentPost,
  getCurrentPostComments,
  deleteCommentFromSelectedPost,
  // setCommentLike,
  setCurrentUserPosts,
};
export default postsOperations;
