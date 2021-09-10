import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PostsBackdrop from '../postsBackdrop/posts-backdrop';
import Loader from 'react-loader-spinner';
import postsOperations from '../../redux/posts/post-operations';
import style from './posts.module.css';
import { toast } from 'react-toastify';
import IPost from '../../common/Post.interface';
import IProps from '../../common/Props.interface';
import { useAppSelector } from '../../redux/store';
import IPostFields from '../../common/PostFields.interface';

const Posts: React.FC<IProps> = props => {
  const history = useHistory();
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [newPostBackdrop, setNewPostBackdrop] = useState(false);
  const currentAuthUser = useAppSelector(state => state.currentUser.user);
  const token = useAppSelector(state => state.currentUser.token);

  useEffect(() => {
    postsOperations.getAllPosts().then(data => {
      if (data) {
        setPosts(data);
      }
    });
  }, []);
  const addPostHandler = () => {
    if (token) {
      setNewPostBackdrop(!newPostBackdrop);
    } else {
      toast(`Login first, please!`);
      history.push('login');
    }
  };
  const showUserPostsHandler = () => {
    if (token) {
      history.push('current-user-posts');
    } else {
      toast(`Login first, please!`);
      history.push('login');
    }
  };

  const createNewPost = (values: IPostFields) => {
    setNewPostBackdrop(!newPostBackdrop);
    postsOperations.createNewPost(values).then(data => {
      if (data) {
        setPosts(data);
      }
    });
    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
    toast(`Note added successfully`);
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
              onClick={() => addPostHandler()}
            >
              ADD NEW POST
            </button>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={() => showUserPostsHandler()}
            >
              SHOW MY POSTS
            </button>
          </div>
          <ul className={style.postsList}>
            {posts?.map((post: IPost) => (
              <li
                key={post._id}
                className={
                  post.postedBy !== currentAuthUser?._id
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
          createNewPost={createNewPost}
          newPostBackdrop={newPostBackdrop}
          setNewPostBackdrop={setNewPostBackdrop}
        />
      ) : null}
    </>
  );
};
export default Posts;
