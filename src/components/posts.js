import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PostsBackdrop from "./posts-backdrop";
import postsOperations from "../redux/posts/post-operations";

export default function Posts(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [newPostBackdrop, setNewPostBackdrop] = useState(false); //flag for backdrop (open or close)
  const [showPostBtn, setShowPostBtn] = useState(true); //flag for btn name (show my posts / show all posts)
  const currentUser = useSelector((state) => state.users.currentAuthUser); //current user
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts); //current user posts
  const posts = useSelector((state) => state.posts.allPosts); // all posts

  useEffect(() => {
    dispatch(postsOperations.getAllPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {newPostBackdrop ? (
        <PostsBackdrop
          newPostBackdrop={newPostBackdrop}
          setNewPostBackdrop={setNewPostBackdrop}
        />
      ) : null}
      <h2>Posts page</h2>
      <button
        className="open-backdrop-btn"
        type="button"
        onClick={() => setNewPostBackdrop(!newPostBackdrop)}
      >
        ADD NEW POST
      </button>
      <button
        type="button"
        onClick={() => {
          currentUser
            ? dispatch(
                postsOperations.setCurrentUserPosts(posts, currentUser._id)
              )
            : alert("Need logined user");
          setShowPostBtn(!showPostBtn);
        }}
      >
        {showPostBtn ? "SHOW MY POSTS" : "SHOW ALL POSTS"}
      </button>
      <ul>
        {showPostBtn
          ? posts.map((post) => (
              <li key={post._id}>
                {post.title}
                <button
                  type="button"
                  onClick={() => {
                    history.push(`${props.match.url}/${post._id}`);
                  }}
                >
                  See more
                </button>
              </li>
            ))
          : currentUserPosts.map((post) => (
              <li key={post._id}>
                {post.title}
                <button
                  type="button"
                  onClick={() => {
                    history.push(`${props.match.url}/${post._id}`);
                  }}
                >
                  See more
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(postsOperations.deletePost(post._id))}
                >
                  Delete
                </button>
              </li>
            ))}
      </ul>
    </>
  );
}
