import axios from "axios";
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchAllPosts = async () => {
  const { data } = await axios.get("/posts?limit=0");
  return data;
};
const fetchCreateNewPost = async (post) => {
  const { data } = await axios.post(`/posts`, post, config);
  return data;
};
const fetchCurrentPost = async (id) => {
  const { data } = await axios.get(`/posts/${id}`);
  return data;
};
const fetchCurrentPostComments = async (id) => {
  const { data } = await axios.get(`/comments/post/${id}`);
  return data;
};
const fetchDeleteCommentFromSelectedPost = async (id) => {
  const { data } = await axios.delete(`/comments/${id}`, config);
  return data;
};
const fetchAddCommentToSelectedPost = async (id, text) => {
  const { data } = await axios.post(
    `/comments/post/${id}`,
    {
      text,
      followedCommentID: null,
    },
    config
  );
  return data;
};

const fetchPostLike = async (id) => {
  const { data } = await axios.put(`/posts/like/${id}`, {}, config);
  return data;
};
const fetchCommentLike = async (id) => {
  const { data } = await axios.put(`/comments/like/${id}`, {}, config);
  return data;
};
const fetchDeletePost = async (id) => {
  const { data } = await axios.delete(`/posts/${id}`, config);
  return data;
};
const postsApi = {
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
