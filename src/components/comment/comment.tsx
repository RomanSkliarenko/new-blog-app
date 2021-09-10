import React, { useState } from 'react';
import style from './comment.module.css';
import commentsOperations from '../../redux/comments/comments-operations';
import { Props } from './comments.interface';
import { toast } from 'react-toastify';

const Comment: React.FC<Props> = ({
  sigleComment,
  userId,
  getCurrentPostComments,
  authUser,
}: Props) => {
  const [editCommentInputFlag, setEditCommentInputFlag] = useState(false);
  const [editCommentInput, setEditCommentInput] = useState('');
  const { text, _id: commentId, likes, commentedBy } = sigleComment;

  const setCommentLike = (id: string) =>
    authUser
      ? commentsOperations
          .setCommentLike(id)
          .then(() => getCurrentPostComments())
      : toast(`Login first, please!`);
  const deleteComment = (id: string) => {
    commentsOperations.deleteComment(id).then(() => getCurrentPostComments());
  };
  const editComment = (id: string, commentText: string) => {
    setEditCommentInputFlag(!editCommentInputFlag);
    return editCommentInput !== ''
      ? commentsOperations
          .editComment(id, commentText)
          .then(() => getCurrentPostComments())
      : toast(`Edit field must have any value!`);
  };

  return (
    <li>
      {text}
      {commentId === '1' ? null : (
        <>
          <span className={style.itemTitle}> | Likes: </span>
          {likes.length}
          <button
            type="button"
            className={style.likeButton}
            onClick={() => setCommentLike(commentId)}
          >
            💔
          </button>
        </>
      )}
      {userId && commentedBy === userId ? (
        <>
          <button
            className={style.sectionNavBtn}
            type="button"
            onClick={() => deleteComment(commentId)}
          >
            DELETE
          </button>
          {editCommentInputFlag ? (
            <>
              <input
                className={style.newCommentInput}
                type="text"
                value={editCommentInput}
                onChange={e => setEditCommentInput(e.target.value)}
              />
              <button
                className={style.sectionNavBtn}
                type="button"
                onClick={() => editComment(commentId, editCommentInput)}
              >
                EDIT
              </button>
            </>
          ) : (
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => {
                setEditCommentInputFlag(!editCommentInputFlag);
              }}
            >
              EDIT
            </button>
          )}
        </>
      ) : null}
    </li>
  );
};

export default Comment;
