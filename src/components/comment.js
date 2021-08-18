import React from "react";
import { useSelector, useDispatch } from "react-redux";
import postActions from "../redux/posts/post-actions";
import axios from "axios";

export default function Comment({ comment }) {
  const currentUserId = useSelector((state) => state.users.currentAuthUser._id);
  const post = useSelector((state) => state.posts.selectedPost);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getCurrentPostComments = (id) => {
    axios
      .get(`/comments/post/${id}`)
      .then(function ({ data }) {
        if (data.length > 0) {
          dispatch(postActions.getSelectedPostComments(data));
        } else {
          dispatch(postActions.getSelectedPostComments(null));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <li key={comment._id}>
      {comment.text}
      <button
        type="button"
        className="like-button"
        onClick={() => {
          axios
            .put(`/comments/like/${comment._id}`, {}, config)
            .then(function (responce) {
              getCurrentPostComments(post._id);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        💔
      </button>
      {comment.likes.length}
      {comment.commentedBy === currentUserId ? (
        <button
          type="button"
          onClick={() => {
            axios
              .delete(`/comments/${comment._id}`, config)
              .then(function (res) {
                dispatch(
                  postActions.deleteCommentFromSelectedPost(comment._id)
                );
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          x
        </button>
      ) : null}
    </li>
  );
}
