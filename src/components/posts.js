import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import postActions from "../redux/posts/post-actions";
import PostsBackdrop from "./posts-backdrop";

export default function Posts(props) {
  const [newPostBackdrop, setNewPostBackdrop] = useState(false); //flag for backdrop (open or close)
  const [showPostBtn, setShowPostBtn] = useState(true); //flag for btn name (show my posts / show all posts)
  let history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token); // token
  const currentUser = useSelector((state) => state.users.currentAuthUser); //current user
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts); //current user posts
  const posts = useSelector((state) => state.posts.allPosts); // all posts
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAllPosts = async () => {
    await axios
      .get("/posts?limit=0")
      .then(function ({ data }) {
        dispatch(postActions.getAllPosts(data));
      })
      .catch(function (error) {
        console.log(error);
      });
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
    history.push(`${props.match.url}/${id}`);
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
  const getCurrentUserPosts = () => {
    if (currentUser) {
      const { _id } = currentUser;
      const myPosts = posts.filter((post) => post.postedBy === _id);
      dispatch(postActions.getCurrentUserPosts(myPosts));
      setShowPostBtn(!showPostBtn);
    } else {
      alert("Need logined user");
    }
  };
  const deletePost = async (id) => {
    await axios
      .delete(`/posts/${id}`, config)
      .then(function (responce) {
        alert("Delete success");
      })
      .catch(function (error) {
        console.log(error);
      });
    await getAllPosts();
    await getCurrentUserPosts();
  };

  return (
    <>
      {newPostBackdrop ? (
        <PostsBackdrop
          getCurrentUserPosts={getCurrentUserPosts}
          getAllPosts={getAllPosts}
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
                <button
                  type="button"
                  onClick={() => {
                    getCurrentPost(post._id);
                    getCurrentPostComments(post._id);
                  }}
                >
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
