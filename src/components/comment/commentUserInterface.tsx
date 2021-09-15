import React, { useState } from 'react';
import style from './comment.module.css';
import commentsOperations from '../../redux/comments/comments-operations';
import { toast } from 'react-toastify';
import IProps from './commentUserInterface.interface';

const CommentUserInterface = ({
  editCommentInputFlag,
  setEditCommentInputFlag,
  commentId,
  getCurrentPostComments,
}: IProps): JSX.Element => {
  const [editCommentInput, setEditCommentInput] = useState('');

  const deleteComment = () => {
    commentsOperations
      .deleteComment(commentId)
      .then(() => getCurrentPostComments());
  };
  const editComment = () =>
    editCommentInput !== ''
      ? commentsOperations.editComment(commentId, editCommentInput).then(() => {
          getCurrentPostComments();
          setEditCommentInputFlag(!editCommentInputFlag);
          setEditCommentInput('');
        })
      : toast(`Edit field must have any value!`);
  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditCommentInput(event.target.value);
  };
  const editHandler = () => {
    if (editCommentInputFlag) {
      return editComment();
    }
    setEditCommentInputFlag(!editCommentInputFlag);
  };
  return (
    <>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={deleteComment}
      >
        DELETE
      </button>
      {editCommentInputFlag && (
        <input
          className={style.newCommentInput}
          type="text"
          value={editCommentInput}
          onChange={changeInputHandler}
        />
      )}
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={editHandler}
      >
        EDIT
      </button>
    </>
  );
};

export default CommentUserInterface;
