import React, { useState } from "react";
import style from "./comment.module.css";
import commentsOperations from "../../redux/comments/comments-operations";

export default function Comment(props) {
  const [editCommentInputFlag, setEditCommentInputFlag] = useState(false);
  const [editCommentInput, setEditCommentInput] = useState("");
  const { sigleComment, userId, getCurrentPostComments, authUser } = props;
  const { text, _id, likes, commentedBy } = sigleComment;
  const commentId = _id;

  const setCommentLike = (id) => {
    authUser
      ? commentsOperations
          .setCommentLike(id)
          .then(() => getCurrentPostComments())
      : alert("register first");
  };
  const deleteComment = (id) => {
    commentsOperations.deleteComment(id).then(() => getCurrentPostComments());
  };
  const editComment = (id, text) => {
    editCommentInput !== ""
      ? commentsOperations
          .editComment(id, text)
          .then(() => getCurrentPostComments())
      : alert("Edit field must have any value!");
    setEditCommentInputFlag(!editCommentInputFlag);
  };

  return (
    <li>
      {text}
      {commentId === "1" ? null : (
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
                onChange={(e) => setEditCommentInput(e.target.value)}
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
}
