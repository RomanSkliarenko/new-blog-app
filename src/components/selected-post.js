import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function SelectedPost() {
  let history = useHistory();
  const post = useSelector((state) => state.posts.selectedPost);
  return (
    <>
      <button type="button" onClick={() => history.push("/posts")}>
        BACK
      </button>
      <ul>
        <li>
          <h2>{post ? post.title : null}</h2>
        </li>
        <li>
          <p>Likes: {post.title.length}</p>
        </li>
        <li>
          <p>Description: {post.description}</p>
        </li>
        <li>
          <p>Text: {post.fullText}</p>
        </li>
      </ul>
    </>
  );
}
