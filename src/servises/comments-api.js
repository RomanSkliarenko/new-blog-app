import axiosApiInstance from "../servises/interseptor";

const currentPostCommentsReq = async (id) => {
  const { data } = await axiosApiInstance.get(`/comments/post/${id}`);
  return data;
};
const deleteCommentFromSelectedPostReq = async (id) => {
  const { data } = await axiosApiInstance.delete(`/comments/${id}`);
  return data;
};
const editSelectedPostCommentReq = async (id, text) => {
  const { data } = await axiosApiInstance.patch(`/comments/${id}`, { text });
  return data;
};
const addCommentToSelectedPostReq = async (id, text) => {
  const { data } = await axiosApiInstance.post(`/comments/post/${id}`, {
    text,
    followedCommentID: null,
  });
  return data;
};
const commentLikeReq = async (id) => {
  const { data } = await axiosApiInstance.put(`/comments/like/${id}`, {});
  return data;
};

const commentsApi = {
  editSelectedPostCommentReq,
  commentLikeReq,
  currentPostCommentsReq,
  deleteCommentFromSelectedPostReq,
  addCommentToSelectedPostReq,
};

export default commentsApi;
