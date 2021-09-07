import commentsApi from '../../servises/comments-api';
import { toast } from 'react-toastify';
import { AxiosPromise } from 'axios';

type Ifn = (id: string) => Promise<
  {
    _id: string;
    commentedBy: string;
    followedCommentID: string;
    postID: string;
    text: string;
    dateCreated: string;
    likes: string[];
    __v: number;
  }[]
>;
type IfuncWithPropText = (id: string, text: string) => Promise<AxiosPromise>;

const getAllPostComments: Ifn = async id => {
  try {
    return await commentsApi.currentPostCommentsReq(id);
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const setCommentLike: Ifn = async id => {
  try {
    return await commentsApi.commentLikeReq(id);
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const deleteComment: Ifn = async id => {
  try {
    const data = await commentsApi.deleteCommentFromSelectedPostReq(id);
    return data;
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const editComment: IfuncWithPropText = async (id, text) => {
  try {
    const data = await commentsApi.editSelectedPostCommentReq(id, text);
    return data;
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const addComment: IfuncWithPropText = async (id, text) => {
  try {
    const data = await commentsApi.addCommentToSelectedPostReq(id, text);
    return data;
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
  }
};
const getPostComments: Ifn = async id => {
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
  } catch (error: any) {
    toast(`${error.response.data.error[0].message}`);
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
