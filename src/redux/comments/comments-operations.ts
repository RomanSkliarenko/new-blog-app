import commentsApi from '../../servises/comments-api';
import { toast } from 'react-toastify';
import axios, { AxiosPromise } from 'axios';
import IComment from '../../common/Comment.interface';

const getAllPostComments: (id: string) => Promise<IComment[]> = async id => {
  try {
    return await commentsApi.currentPostCommentsReq(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const setCommentLike: (id: string) => Promise<AxiosPromise> = async id => {
  try {
    return await commentsApi.commentLikeReq(id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const deleteComment: (id: string) => Promise<AxiosPromise> = async id => {
  try {
    const data = await commentsApi.deleteCommentFromSelectedPostReq(id);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast(`${error?.response?.data.error[0].message}`);
    }
  }
};
const editComment: (id: string, text: string) => Promise<AxiosPromise> = async (
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
const addComment: (id: string, text: string) => Promise<AxiosPromise> = async (
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
const getPostComments: (id: string) => Promise<IComment[]> = async id => {
  const NO_COMMENTS_PLACEHOLDER = [
    {
      _id: '1',
      commentedBy: '1',
      dateCreated: '1',
      followedCommentID: null,
      likes: [],
      postID: '1',
      text: 'No comments yet',
      __v: 1,
    },
  ];
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
  getAllPostComments,
  deleteComment,
  editComment,
  addComment,
};
export default commentsOperations;
