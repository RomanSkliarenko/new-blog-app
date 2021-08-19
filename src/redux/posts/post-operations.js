import postsApi from "../../servises/posts-api";
import postsActions from "../posts/post-actions";

const getAllPosts = () => (dispatch) => {
  postsApi
    .fetchAllPosts()
    .then(function (data) {
      dispatch(postsActions.getAllPosts(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getCurrentPost = (id) => (dispatch) => {
  postsApi
    .fetchCurrentPost(id)
    .then(function (data) {
      dispatch(postsActions.setSelectedPost(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const setCurrentUserPosts = (posts, id) => (dispatch) => {
  const myPosts = posts.filter((post) => post.postedBy === id);
  dispatch(postsActions.setCurrentUserPosts(myPosts));
};
const deletePost = (id) => async (dispatch) => {
  await postsApi
    .fetchDeletePost(id)
    .then(function (data) {
      alert("Delete success");
    })
    .catch(function (error) {
      console.log(error);
    });
  await postsApi
    .fetchAllPosts()
    .then(function (data) {
      dispatch(postsActions.getAllPosts(data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getCurrentPostComments = (id) => (dispatch) => {
  postsApi
    .fetchCurrentPostComments(id)
    .then(function (data) {
      dispatch(postsActions.setSelectedPostComments(data));
    })
    .catch(function (error) {
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
const setCommentLike = (commentId, postId) => (dispatch) => {
  postsApi
    .fetchCommentLike(commentId)
    .then(function (_) {
      dispatch(postsOperations.getCurrentPostComments(postId));
    })
    .catch(function (error) {
      console.log(error);
    });
};
const createNewPost = (post) => async (dispatch) => {
  await postsApi
    .fetchCreateNewPost(post)
    .then(function (_) {
      alert("success");
    })
    .catch(function (error) {
      alert("fail");
      console.log(error);
    });
  await postsApi
    .fetchAllPosts()
    .then(function (data) {
      dispatch(postsActions.getAllPosts(data));
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
  setCommentLike,
  setCurrentUserPosts,
};
export default postsOperations;
