import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import postActions from "../redux/posts/post-actions";
import postsOperations from "../redux/posts/post-operations";
import postsApi from "../servises/posts-api";
import Comments from "./comments";

export default function SelectedPost() {
  const dispatch = useDispatch();
  let history = useHistory(); // for back btn
  let { id } = useParams();

  useEffect(() => {
    dispatch(postsOperations.getCurrentPost(id));
    dispatch(postsOperations.getCurrentPostComments(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [newCommentInputFlag, setNewCommentInputFlag] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState("");
  const post = useSelector((state) => state.posts.selectedPost);
  // const postComments = useSelector((state) => state.posts.selectedPostComments);
  const { title, likes, fullText, description } = post;
  return (
    <>
      <button
        type="button"
        onClick={() => {
          // dispatch(postActions.setSelectedPost(null));
          // dispatch(postActions.setSelectedPostComments(null));
          history.push("/posts");
        }}
      >
        BACK
      </button>
      <ul>
        <li>
          <h2>{post ? title : null}</h2>
        </li>
        <li>
          Likes: {post ? likes.length : null}
          <button
            type="button"
            className="like-button"
            onClick={() => {
              postsApi
                .fetchPostLike(id)
                .then(function (_) {
                  dispatch(postsOperations.getCurrentPost(id));
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
          <p>Description: {post ? description : null}</p>
        </li>
        <li>
          <p>Text: {post ? fullText : null}</p>
        </li>
        <li>
          <p>Comments:</p>
          <button
            type="button"
            onClick={(_) => {
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
                  postsApi
                    .fetchAddCommentToSelectedPost(id, newCommentInput)
                    .then(function (data) {
                      dispatch(postsOperations.getCurrentPostComments(id));
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
            <Comments />
          </ul>
        </li>
      </ul>
    </>
  );
}
