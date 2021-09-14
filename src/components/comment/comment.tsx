import React, { useState } from 'react';
import style from './comment.module.css';
import commentsOperations from '../../redux/comments/comments-operations';
import { Props } from './comments.interface';
import { toast } from 'react-toastify';

const BALVANKA = '1';

const Comment: React.FC<Props> = ({
  sigleComment,
  userId,
  getCurrentPostComments,
  authUser,
}: Props) => {
  const [editCommentInputFlag, setEditCommentInputFlag] = useState(false);
  const [editCommentInput, setEditCommentInput] = useState('');
  const { text, _id: commentId, likes, commentedBy } = sigleComment;

  const setCommentLike = () => {
    if (authUser) {
      return commentsOperations
        .setCommentLike(commentId)
        .then(() => getCurrentPostComments());
    }
    toast(`Login first, please!`);
  };

  const deleteComment = () => {
    commentsOperations
      .deleteComment(commentId)
      .then(() => getCurrentPostComments());
  };
  const editComment = () => {
    setEditCommentInputFlag(!editCommentInputFlag);
    return editCommentInput !== ''
      ? commentsOperations
          .editComment(commentId, editCommentInput)
          .then(() => getCurrentPostComments())
      : toast(`Edit field must have any value!`);
  };
  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditCommentInput(event.target.value);
  };
  const inputFlagHandler = () => setEditCommentInputFlag(!editCommentInputFlag);

  return (
    <li>
      {text}
      {commentId === BALVANKA && (
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
      {commentedBy === userId ? (
        <>
          <button
            className={style.sectionNavBtn}
            type="button"
            onClick={deleteComment}
          >
            DELETE
          </button>
          {editCommentInputFlag ? (
            <>
              <input
                className={style.newCommentInput}
                type="text"
                value={editCommentInput}
                onChange={changeInputHandler}
              />
              <button
                className={style.sectionNavBtn}
                type="button"
                onClick={editComment}
              >
                SUBMIT
              </button>
            </>
          ) : (
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={inputFlagHandler}
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
