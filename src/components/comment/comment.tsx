import React, { useState } from 'react';
import style from './comment.module.css';
import commentsOperations from '../../redux/comments/comments-operations';
import { Props } from './comments.interface';
import { toast } from 'react-toastify';
import NO_COMMENTS_PLACEHOLDER from '../../common/constants/initCommentsArray';
import CommentUserInterface from './commentUserInterface';

const Comment: React.FC<Props> = ({
  sigleComment,
  userId,
  getCurrentPostComments,
  authUser,
}: Props) => {
  const [editCommentInputFlag, setEditCommentInputFlag] = useState(false);
  const { text, _id: commentId, likes, commentedBy } = sigleComment;

  const setCommentLike = () => {
    if (authUser) {
      return commentsOperations
        .setCommentLike(commentId)
        .then(() => getCurrentPostComments());
    }
    toast(`Login first, please!`);
  };

  return (
    <li className={style.listItem}>
      {text}
      {commentId !== NO_COMMENTS_PLACEHOLDER[0]._id && (
        <>
          <span className={style.itemTitle}> | Likes: </span>
          {likes.length}
          <button
            type="button"
            className={style.likeButton}
            onClick={setCommentLike}
          >
            💔
          </button>
        </>
      )}
      {commentedBy === userId && (
        <CommentUserInterface
          commentId={commentId}
          getCurrentPostComments={getCurrentPostComments}
          editCommentInputFlag={editCommentInputFlag}
          setEditCommentInputFlag={setEditCommentInputFlag}
        />
      )}
    </li>
  );
};

export default Comment;
