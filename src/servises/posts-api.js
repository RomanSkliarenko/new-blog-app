import axiosApiInstance from "../servises/interseptor";

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
const fetchPostLike = async (id) => {
  const { data } = await axiosApiInstance.put(`/posts/like/${id}`, {});
  return data;
};
const fetchDeletePost = async (id) => {
  const { data } = await axiosApiInstance.delete(`/posts/${id}`);
  return data;
};
const postsApi = {
  fetchEditPost,
  fetchCreateNewPost,
  fetchPostLike,
  fetchAllPosts,
  fetchCurrentPost,
  fetchDeletePost,
};

export default postsApi;
