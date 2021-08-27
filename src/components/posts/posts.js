import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PostsBackdrop from "../postsBackdrop/posts-backdrop";
import Loader from "react-loader-spinner";
import postsApi from "../../servises/posts-api";
import postsOperations from "../../redux/posts/post-operations";
import style from "./posts.module.css";

export default function Posts(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const [posts, setPosts] = useState(null);
  const [newPostBackdrop, setNewPostBackdrop] = useState(false); //flag for backdrop (open or close)
  const currentAuthUser = useSelector((state) => state.users.currentAuthUser);

  useEffect(() => {
    postsApi
      .fetchAllPosts()
      .then(function ({ data }) {
        setPosts(data);
      })
      .catch(function (error) {
        alert(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewPost = (post) => {
    dispatch(postsOperations.createNewPost(post));
    postsApi
      .fetchAllPosts()
      .then(function ({ data }) {
        alert("Note added successfully");
        setPosts(data);
        window.scrollTo({
          top: 1000,
          behavior: "smooth",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    setNewPostBackdrop(!newPostBackdrop);
  };

  return (
    <>
      {posts ? (
        <section className={style.postsContainer}>
          <h2 className={style.pageTitle}>Posts page</h2>
          <div className={style.sectionNavBtnContainer}>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => {
                if (currentAuthUser.name) {
                  setNewPostBackdrop(!newPostBackdrop);
                } else {
                  alert("need auth user");
                  history.push("login");
                }
              }}
            >
              ADD NEW POST
            </button>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => {
                if (currentAuthUser.name) {
                  history.push("current-user-posts");
                } else {
                  alert("need auth user");
                  history.push("login");
                }
              }}
            >
              SHOW MY POSTS
            </button>
          </div>
          <ul className={style.postsList}>
            {posts?.map((post) => (
              <li
                key={post._id}
                className={
                  post.postedBy !== currentAuthUser._id
                    ? style.postsItem
                    : `${style.currentUserPostsItem} ${style.postsItem}`
                }
              >
                <h3>{post.title}</h3>
                <button
                  className={style.postsItemBtn}
                  type="button"
                  onClick={() => {
                    history.push(`${props.match.url}/${post._id}`);
                  }}
                >
                  details
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <Loader
          className="spinner"
          type="BallTriangle"
          color="#7f0000"
          height={80}
          width={80}
        />
      )}
      {newPostBackdrop ? (
        <PostsBackdrop
          editOrCreate={false}
          action={addNewPost}
          newPostBackdrop={newPostBackdrop}
          setNewPostBackdrop={setNewPostBackdrop}
        />
      ) : null}
    </>
  );
}
