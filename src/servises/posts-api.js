import axiosApiInstance from "../servises/interseptor";
axiosApiInstance.defaults.baseURL =
  "https://nodejs-test-api-blog.herokuapp.com/api/v1";

const fetchAllPosts = async () => {
  const { data } = await axiosApiInstance.get("/posts?limit=0");
  return data;
};

const fetchCreateNewPost = async (post) => {
  const { data } = await axiosApiInstance.post(`/posts`, post);
  return data;
};
const fetchEditPost = async (post, id) => {
  const { data } = await axiosApiInstance.patch(`/posts/${id}`, post);
  return data;
};
const fetchCurrentPost = async (id) => {
  const { data } = await axiosApiInstance.get(`/posts/${id}`);
  return data;
};
const fetchCurrentPostComments = async (id) => {
  const { data } = await axiosApiInstance.get(`/comments/post/${id}`);
  return data;
};
const fetchDeleteCommentFromSelectedPost = async (id) => {
  const { data } = await axiosApiInstance.delete(`/comments/${id}`);
  return data;
};
const fetchEditSelectedPostComment = async (id, text) => {
  const { data } = await axiosApiInstance.patch(`/comments/${id}`, { text });
  return data;
};
const fetchAddCommentToSelectedPost = async (id, text) => {
  const { data } = await axiosApiInstance.post(`/comments/post/${id}`, {
    text,
    followedCommentID: null,
  });
  return data;
};

const fetchPostLike = async (id) => {
  const { data } = await axiosApiInstance.put(`/posts/like/${id}`, {});
  return data;
};
const fetchCommentLike = async (id) => {
  const { data } = await axiosApiInstance.put(`/comments/like/${id}`, {});
  return data;
};
const fetchDeletePost = async (id) => {
  const { data } = await axiosApiInstance.delete(`/posts/${id}`);
  return data;
};
const postsApi = {
  fetchEditSelectedPostComment,
  fetchEditPost,
  fetchCreateNewPost,
  fetchCommentLike,
  fetchPostLike,
  fetchAllPosts,
  fetchCurrentPost,
  fetchCurrentPostComments,
  fetchDeleteCommentFromSelectedPost,
  fetchAddCommentToSelectedPost,
  fetchDeletePost,
};

export default postsApi;
