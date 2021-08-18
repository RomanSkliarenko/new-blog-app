import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import postActions from "../redux/posts/post-actions";
import { useHistory } from "react-router-dom";
import Comment from "./comment";

export default function SelectedPost() {
  const [newCommentInputFlag, setNewCommentInputFlag] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  const post = useSelector((state) => state.posts.selectedPost);
  const token = useSelector((state) => state.users.token);
  const postComments = useSelector((state) => state.posts.selectedPostComments);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const getCurrentPost = async (id) => {
    await axios
      .get(`/posts/${id}`)
      .then(function ({ data }) {
        dispatch(postActions.getSelectedPost(data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <button
        type="button"
        onClick={() => {
          dispatch(postActions.getSelectedPost(null));
          dispatch(postActions.getSelectedPostComments(null));
          history.push("/posts");
        }}
      >
        BACK
      </button>
      <ul>
        <li>
          <h2>{post ? post.title : null}</h2>
        </li>
        <li>
          Likes: {post.likes.length}
          <button
            type="button"
            className="like-button"
            onClick={() => {
              axios
                .put(`/posts/like/${post._id}`, {}, config)
                .then(function (responce) {
                  getCurrentPost(post._id);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            💔
          </button>
        </li>
        <li>
          <p>Description: {post.description}</p>
        </li>
        <li>
          <p>Text: {post.fullText}</p>
        </li>
        <li>
          <p>Comments:</p>
          <button
            type="button"
            onClick={(event) => {
              setNewCommentInputFlag(!newCommentInputFlag);
            }}
          >
            ADD COMMENT
          </button>
          {newCommentInputFlag ? (
            <>
              <input
                type="text"
                autoFocus={true}
                onChange={(event) => {
                  setNewCommentInput(event.target.value);
                }}
                value={newCommentInput}
              ></input>
              <button
                type="button"
                onClick={() => {
                  axios
                    .post(
                      `/comments/post/${post._id}`,
                      {
                        text: newCommentInput,
                        followedCommentID: null,
                      },
                      config
                    )
                    .then(function ({ data }) {
                      dispatch(postActions.addCommentToSelectedPost(data));
                      setNewCommentInput("");
                      setNewCommentInputFlag(false);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }}
              >
                SEND
              </button>
            </>
          ) : null}
          <ul>
            {postComments
              ? postComments.map((comment) => {
                  return <Comment key={comment._id} comment={comment} />;
                })
              : null}
          </ul>
        </li>
      </ul>
    </>
  );
}
