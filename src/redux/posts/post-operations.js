import postsApi from "../../servises/posts-api";
// import postsActions from "../posts/post-actions";

const createNewPost = (post) => async (dispatch) => {
  await postsApi
    .fetchCreateNewPost(post)
    .then(function (_) {})
    .catch(function (error) {
      alert(error);
    });
};

const postsOperations = {
  createNewPost,
};
export default postsOperations;
