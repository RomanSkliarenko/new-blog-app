import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostsBackdrop from '../postsBackdrop/posts-backdrop';
import postsOperations from '../../redux/posts/post-operations';
import Loader from 'react-loader-spinner';
import style from './currentUserPosts.module.css';
import { toast } from 'react-toastify';
import IState from '../../common/State.interface';
import { IPost, IProps } from './currentUserPosts.interface';

export default function CurrentUserPosts(props: IProps) {
  const [posts, setPosts] = useState<null | IPost[]>(null);
  const history = useHistory();
  const [newPostBackdrop, setNewPostBackdrop] = useState(false); // flag for backdrop (open or close)
  const { _id: userId } = useSelector((state: IState) => state.user.user); // current user

  const getCurrentUserPosts = () => {
    postsOperations.getCurrentUserPosts(userId).then(res => setPosts(res));
  };
  const createNewPost = (post: IPost) => {
    postsOperations
      .createNewPost(post)
      .then(data =>
        setPosts(
          data.filter((singlePost: IPost) => singlePost.postedBy === userId),
        ),
      );
    setNewPostBackdrop(!newPostBackdrop);
    toast(`Note added successfully`);
  };
  const deletePost = (postId: string) => {
    postsOperations.deletePost(postId, userId).then(data => setPosts(data));
  };

  useEffect(() => {
    getCurrentUserPosts();
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
                history.push('/posts');
              }}
            >
              SHOW ALL POSTS
            </button>
          </div>
          <ul className={style.postsList}>
            {posts?.map((post: IPost) => (
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
                      deletePost(post._id);
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
          action={createNewPost}
          newPostBackdrop={newPostBackdrop}
          setNewPostBackdrop={setNewPostBackdrop}
        />
      ) : null}
    </>
  );
}