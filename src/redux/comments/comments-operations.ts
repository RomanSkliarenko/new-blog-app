import commentsApi from '../../servises/comments-api';
import { toast } from 'react-toastify';
import axios from 'axios';
import IComment from '../../common/Comment.interface';
import NO_COMMENTS_PLACEHOLDER from '../../common/constants/initCommentsArray';

type Nothing = undefined;

const setCommentLike: (id: string) => Promise<Nothing> = async id => {
  try {
    return await commentsApi.commentLikeReq(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const deleteComment: (id: string) => Promise<Nothing> = async id => {
  try {
    const data = await commentsApi.deleteCommentFromSelectedPostReq(id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};

const editComment: (id: string, text: string) => Promise<Nothing> = async (
  id,
  text,
) => {
  try {
    const data = await commentsApi.editSelectedPostCommentReq(id, text);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};

const addComment: (id: string, text: string) => Promise<Nothing> = async (
  id,
  text,
) => {
  try {
    const data = await commentsApi.addCommentToSelectedPostReq(id, text);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};

const getPostComments = async (
  id: string,
): Promise<Array<IComment> | Nothing> => {
  try {
    const comments = await commentsApi.currentPostCommentsReq(id);
    if (comments.length) {
      return comments;
    }
    return NO_COMMENTS_PLACEHOLDER;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};

const commentsOperations = {
  getPostComments,
  setCommentLike,
  deleteComment,
  editComment,
  addComment,
};
export default commentsOperations;
