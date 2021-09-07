import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import commentsOperations from '../../redux/comments/comments-operations';
import postsOperations from '../../redux/posts/post-operations';
import Loader from 'react-loader-spinner';
import PostsBackdrop from '../postsBackdrop/posts-backdrop';
import style from './selected-post.module.css';
import Comment from '../comment/comment';
import { toast } from 'react-toastify';
import IState from '../../common/State.interface';
import IPost from '../../common/Post.interface';
import IComment from '../../common/Comment.interface';
import { useAppSelector } from '../../redux/store';

interface IId {
  id: string;
}

export default function SelectedPost() {
  const history = useHistory(); // for back btn
  const [newCommentInputFlag, setNewCommentInputFlag] = useState(false);
  const [newCommentInput, setNewCommentInput] = useState('');
  const [newPostBackdrop, setNewPostBackdrop] = useState(false); // flag for backdrop (open or close)
  const [currentPost, setCurrentPost] = useState<IPost>();
  const [currentPostComments, setCurrentPostComments] = useState<
    IComment[] | null
  >();
  const _id = useAppSelector(state => state.currentUser.user?._id); // current user
  const { id } = useParams<IId>();

  const getCurrentPost = () => {
    postsOperations.getSelectedPost(id).then(data => setCurrentPost(data));
  };
  const getCurrentPostComments = () => {
    commentsOperations
      .getPostComments(id)
      .then(res => setCurrentPostComments(res));
  };
  const editPost = (
    values: {
      title: string;
      fullText: string;
      description: string;
    },
    postId: string,
  ) => {
    postsOperations
      .editPost(values, postId)
      .then(() => getCurrentPost())
      .then(() => getCurrentPostComments());
    setNewPostBackdrop(!newPostBackdrop);
    toast(`Success`);
  };
  const addCommentHandler = () =>
    _id
      ? setNewCommentInputFlag(!newCommentInputFlag)
      : toast(`Login first, please!`);
  const setPostLike = () =>
    _id
      ? postsOperations.setPostLike(id).then(() => getCurrentPost())
      : toast(`Login first, please!`);

  const addComment = () => {
    commentsOperations.addComment(id, newCommentInput).then(() => {
      setNewCommentInput('');
      setNewCommentInputFlag(false);
      getCurrentPostComments();
    });
  };
  useEffect(() => {
    getCurrentPostComments();
    getCurrentPost();
  }, []);

  return (
    <>
      {currentPost ? (
        <section className={style.sectionContainer}>
          <div className={style.sectionNavBtnContainer}>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => {
                history.push('/posts');
              }}
            >
              BACK
            </button>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => addCommentHandler()}
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
              <span className={style.itemTitle}>Likes:</span>{' '}
              {currentPost?.likes?.length}
              <button
                type="button"
                className={style.likeButton}
                onClick={() => setPostLike()}
              >
                💔
              </button>
            </li>
            <li className={style.listItem}>
              <span className={style.itemTitle}>Description:</span>{' '}
              {currentPost?.description}
            </li>
            <li className={style.listItem}>
              <span className={style.itemTitle}>Text:</span>{' '}
              {currentPost?.fullText}
            </li>
            <li className={style.listItem}>
              <span className={style.itemTitle}>Comments:</span>
              {newCommentInputFlag ? (
                <>
                  <input
                    className={style.newCommentInput}
                    type="text"
                    onChange={event => {
                      setNewCommentInput(event.target.value);
                    }}
                    value={newCommentInput}
                  />
                  <button
                    className={style.sectionNavBtn}
                    type="button"
                    onClick={() => addComment()}
                  >
                    SEND
                  </button>
                </>
              ) : null}
              <ul>
                {currentPostComments?.map((comment: IComment) => (
                  <Comment
                    key={comment._id}
                    authUser={!!_id}
                    sigleComment={comment}
                    getCurrentPostComments={getCurrentPostComments}
                    userId={_id}
                  />
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
          editPost={editPost}
          newPostBackdrop={newPostBackdrop}
          setNewPostBackdrop={setNewPostBackdrop}
          editOrCreate
        />
      ) : null}
    </>
  );
}
