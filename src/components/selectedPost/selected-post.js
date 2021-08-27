import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import postsApi from "../../servises/posts-api";
import Loader from "react-loader-spinner";
import PostsBackdrop from "../postsBackdrop/posts-backdrop";
import style from "./selected-post.module.css";

export default function SelectedPost() {
  const [newCommentInputFlag, setNewCommentInputFlag] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [editCommentInputFlag, setEditCommentInputFlag] = useState(false);
  const [editCommentInput, setEditCommentInput] = useState("");
  const [newPostBackdrop, setNewPostBackdrop] = useState(false); //flag for backdrop (open or close)
  let history = useHistory(); // for back btn
  const [currentPost, setCurrentPost] = useState(null);
  const [currentPostComments, setCurrentPostComments] = useState(null);
  const _id = useSelector((state) => state.users.currentAuthUser._id); //current user
  let { id } = useParams();
  const getCurrentPost = () => {
    postsApi
      .fetchCurrentPost(id)
      .then(function (data) {
        setCurrentPost(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getCurrentPostComments = () => {
    postsApi
      .fetchCurrentPostComments(id)
      .then(function (data) {
        setCurrentPostComments(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getCurrentPost();
    getCurrentPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editPost = (post, postId) => {
    //func for backdrop action
    console.log(postId);
    postsApi
      .fetchEditPost(post, postId)
      .then(function ({ data }) {
        getCurrentPost();
        getCurrentPostComments();
      })
      .catch(function (error) {
        console.log(error);
      });
    setNewPostBackdrop(!newPostBackdrop);
  };

  return (
    <>
      {currentPost ? (
        <section className={style.sectionContainer}>
          <div className={style.sectionNavBtnContainer}>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => {
                history.push("/posts");
              }}
            >
              BACK
            </button>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={(_) => {
                if (_id) {
                  setNewCommentInputFlag(!newCommentInputFlag);
                } else {
                  alert("register first");
                  return;
                }
              }}
            >
              ADD COMMENT
            </button>
            {_id && currentPost.postedBy === _id ? (
              <button
                className={style.sectionNavBtn}
                type="button"
                onClick={() => {
                  setNewPostBackdrop(!newPostBackdrop);
                }}
              >
                EDIT
              </button>
            ) : null}
          </div>

          <ul className={style.postList}>
            <li className={style.listItem}>
              <span className={style.postTitle}>{currentPost?.title}</span>
            </li>
            <li className={style.listItem}>
              <span className={style.itemTitle}>Likes:</span>{" "}
              {currentPost?.likes?.length}
              <button
                type="button"
                className={style.likeButton}
                onClick={() => {
                  if (_id) {
                    postsApi
                      .fetchPostLike(id)
                      .then(function (_) {
                        getCurrentPost();
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  } else {
                    alert("register first");
                    history.push("/login");
                  }
                }}
              >
                💔
              </button>
            </li>
            <li className={style.listItem}>
              <span className={style.itemTitle}>Description:</span>{" "}
              {currentPost?.description}
            </li>
            <li className={style.listItem}>
              <span className={style.itemTitle}>Text:</span>{" "}
              {currentPost?.fullText}
            </li>
            <li className={style.listItem}>
              <span className={style.itemTitle}>Comments:</span>
              {newCommentInputFlag ? (
                <>
                  <input
                    className={style.newCommentInput}
                    type="text"
                    autoFocus={true}
                    onChange={(event) => {
                      setNewCommentInput(event.target.value);
                    }}
                    value={newCommentInput}
                  ></input>
                  <button
                    className={style.sectionNavBtn}
                    type="button"
                    onClick={() => {
                      postsApi
                        .fetchAddCommentToSelectedPost(id, newCommentInput)
                        .then(function (_) {
                          setNewCommentInput("");
                          setNewCommentInputFlag(false);
                          getCurrentPostComments();
                        })
                        .catch(function (error) {
                          console.log(error);
                          alert("Oooops :(");
                        });
                    }}
                  >
                    SEND
                  </button>
                </>
              ) : null}
              <ul>
                {currentPostComments?.map((comment) => (
                  <li key={comment._id}>
                    {comment.text}
                    <span className={style.itemTitle}> | Likes: </span>
                    {comment.likes.length}
                    <button
                      type="button"
                      className={style.likeButton}
                      onClick={() => {
                        if (_id) {
                          postsApi
                            .fetchCommentLike(comment._id)
                            .then(function (_) {
                              getCurrentPostComments();
                            })
                            .catch(function (error) {
                              console.log(error);
                            });
                        } else {
                          alert("register first");
                          return;
                        }
                      }}
                    >
                      💔
                    </button>
                    {_id && comment.commentedBy === _id ? (
                      <>
                        <button
                          className={style.sectionNavBtn}
                          type="button"
                          onClick={() => {
                            postsApi
                              .fetchDeleteCommentFromSelectedPost(comment._id)
                              .then(function (_) {
                                getCurrentPostComments();
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          }}
                        >
                          DELETE
                        </button>
                        {editCommentInputFlag ? (
                          <>
                            <input
                              className={style.newCommentInput}
                              type="text"
                              value={editCommentInput}
                              onChange={(e) =>
                                setEditCommentInput(e.target.value)
                              }
                            />
                            <button
                              className={style.sectionNavBtn}
                              type="button"
                              onClick={() => {
                                setEditCommentInputFlag(!editCommentInputFlag);
                                if (editCommentInput !== "") {
                                  postsApi
                                    .fetchEditSelectedPostComment(
                                      comment._id,
                                      editCommentInput
                                    )
                                    .then(function (_) {
                                      getCurrentPostComments();
                                    })
                                    .catch(function (error) {
                                      alert("Oooops :(");
                                      console.log(error);
                                    });
                                }
                              }}
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
                ))}
              </ul>
            </li>
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
          currentPost={currentPost}
          action={editPost}
          newPostBackdrop={newPostBackdrop}
          setNewPostBackdrop={setNewPostBackdrop}
          editOrCreate={true}
        />
      ) : null}
    </>
  );
}
