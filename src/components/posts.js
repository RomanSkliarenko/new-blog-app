import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import postActions from "../redux/posts/post-actions";
import PostsBackdrop from "./posts-backdrop";

export default function Posts(props) {
  const [newPostBackdrop, setNewPostBackdrop] = useState(false);
  const [showPostBtn, setShowPostBtn] = useState(true);
  let history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const posts = useSelector((state) => state.posts.allPosts);
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);
  useEffect(() => {
    axios
      .get("/posts?limit=0")
      .then(function ({ data }) {
        dispatch(postActions.getAllPosts(data));
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getCurrentPost = (id) => {
    axios
      .get(`/posts/${id}`)
      .then(function ({ data }) {
        dispatch(postActions.getSelectedPost(data));
        history.push(`${props.match.url}/${id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getCurrentUserPosts = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const id = JSON.parse(user)._id;
      const myPosts = posts.filter((post) => post.postedBy === id);
      dispatch(postActions.getCurrentUserPosts(myPosts));
      setShowPostBtn(!showPostBtn);
    }
  };
  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/posts/${id}`, config)
      .then(function (responce) {
        console.log(responce);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      <button type="button" onClick={() => getCurrentUserPosts()}>
        {showPostBtn ? "SHOW MY POSTS" : "SHOW ALL POSTS"}
      </button>
      <ul>
        {showPostBtn
          ? posts.map((post) => (
              <li key={post._id}>
                {post.title}
                <button type="button" onClick={() => getCurrentPost(post._id)}>
                  See more
                </button>
              </li>
            ))
          : currentUserPosts.map((post) => (
              <li key={post._id}>
                {post.title}
                <button type="button" onClick={() => getCurrentPost(post._id)}>
                  See more
                </button>
                <button type="button" onClick={() => deletePost(post._id)}>
                  Delete
                </button>
              </li>
            ))}
      </ul>
    </>
  );
}
