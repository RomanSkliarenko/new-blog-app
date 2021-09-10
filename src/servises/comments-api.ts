import axiosApiInstance from './interseptor';
import IComment from '../common/Comment.interface';

type Nothing = undefined;

const currentPostCommentsReq: (id: string) => Promise<IComment[]> =
  async id => {
    const { data } = await axiosApiInstance.get(`/comments/post/${id}`);
    return data;
  };
const deleteCommentFromSelectedPostReq = async (
  id: string,
): Promise<Nothing> => {
  const { data } = await axiosApiInstance.delete(`/comments/${id}`);
  return data;
};
const editSelectedPostCommentReq = async (
  id: string,
  text: string,
): Promise<Nothing> => {
  const { data } = await axiosApiInstance.patch(`/comments/${id}`, { text });
  return data;
};
const addCommentToSelectedPostReq = async (
  id: string,
  text: string,
): Promise<Nothing> => {
  const { data } = await axiosApiInstance.post(`/comments/post/${id}`, {
    text,
    followedCommentID: null,
  });
  return data;
};
const commentLikeReq = async (id: string): Promise<Nothing> => {
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
