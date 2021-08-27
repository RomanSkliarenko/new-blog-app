import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PostsBackdrop from "../postsBackdrop/posts-backdrop";
import postsOperations from "../../redux/posts/post-operations";
import Loader from "react-loader-spinner";
import postsApi from "../../servises/posts-api";
import style from "./currentUserPosts.module.css";

export default function CurrentUserPosts(props) {
  const [posts, setPosts] = useState(null);
  let history = useHistory();
  const dispatch = useDispatch();
  const [newPostBackdrop, setNewPostBackdrop] = useState(false); //flag for backdrop (open or close)
  const { _id } = useSelector((state) => state.users.currentAuthUser); //current user

  const getCurrentUserPosts = () => {
    postsApi
      .fetchAllPosts()
      .then(function ({ data }) {
        setPosts(data.filter((post) => post.postedBy === _id));
      })
      .catch(function (error) {
        alert(error);
      });
  };
  const addCurrentAuthUserPost = (post) => {
    dispatch(postsOperations.createNewPost(post));
    getCurrentUserPosts();
    setNewPostBackdrop(!newPostBackdrop);
  };

  useEffect(() => {
    getCurrentUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {posts ? (
        <section className={style.postsContainer}>
          <h2 className={style.pageTitle}>My posts page</h2>
          <div className={style.sectionNavBtnContainer}>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => setNewPostBackdrop(!newPostBackdrop)}
            >
              ADD NEW POST
            </button>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => {
                history.push("/posts");
              }}
            >
              SHOW ALL POSTS
            </button>
          </div>
          <ul className={style.postsList}>
            {posts?.map((post) => (
              <li key={post._id} className={style.postsItem}>
                {post.title}
                <div className={style.sectionNavBtnContainer}>
                  <button
                    className={style.postsItemBtn}
                    type="button"
                    onClick={() => {
                      history.push(`${props.match.url}/${post._id}`);
                    }}
                  >
                    details
                  </button>
                  <button
                    className={style.postsItemBtn}
                    type="button"
                    onClick={() => {
                      postsApi
                        .fetchDeletePost(post._id)
                        .then(() => getCurrentUserPosts());
                    }}
                  >
                    Delete
                  </button>
                </div>
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
          action={addCurrentAuthUserPost}
          newPostBackdrop={newPostBackdrop}
          setNewPostBackdrop={setNewPostBackdrop}
        />
      ) : null}
    </>
  );
}
