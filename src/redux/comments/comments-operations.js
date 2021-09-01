import commentsApi from "../../servises/comments-api";

const getAllPostComments = async (id) => {
  try {
    return await commentsApi.currentPostCommentsReq(id);
  } catch (error) {
    alert(error);
  }
};
const setCommentLike = async (id) => {
  try {
    const data = await commentsApi.commentLikeReq(id);
    return data;
  } catch (error) {
    alert(error);
  }
};
const deleteComment = async (id) => {
  try {
    const data = await commentsApi.deleteCommentFromSelectedPostReq(id);
    return data;
  } catch (error) {
    alert(error);
  }
};
const editComment = async (id, text) => {
  try {
    const data = await commentsApi.editSelectedPostCommentReq(id, text);
    return data;
  } catch (error) {
    alert(error);
  }
};
const addComment = async (id, text) => {
  try {
    const data = await commentsApi.addCommentToSelectedPostReq(id, text);
    return data;
  } catch (error) {
    alert(error);
  }
};
const getPostCmments = async (id) => {
  const NO_COMMENTS_PLACEHOLDER = [
    {
      _id: "1",
      commentedBy: "1",
      dateCreated: "1",
      followedCommentID: null,
      likes: [],
      postID: "1",
      text: "No comments yet",
      __v: 1,
    },
  ];
  try {
    const comments = await commentsApi.currentPostCommentsReq(id);
    if (comments.length) {
      return comments;
    } else {
      return NO_COMMENTS_PLACEHOLDER;
    }
  } catch (error) {
    alert(error);
  }
};

const commentsOperations = {
  getPostCmments,
  setCommentLike,
  getAllPostComments,
  deleteComment,
  editComment,
  addComment,
};
export default commentsOperations;
