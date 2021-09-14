import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PostsBackdrop from '../postsBackdrop/posts-backdrop';
import postsOperations from '../../redux/posts/post-operations';
import style from './posts.module.css';
import { toast } from 'react-toastify';
import IPost from '../../common/Post.interface';
import { useAppSelector } from '../../redux/store';
import IPostFields from '../../common/PostFields.interface';
import CurrentUserPostsList from '../currentUserPostsList/currentUserPostsList';
import Spinner from '../spinner/spinner';

const Posts: React.FC = () => {
  const history = useHistory();
  const [posts, setPosts] = useState<IPost[] | null | undefined>(null);
  const [newPostBackdrop, setNewPostBackdrop] = useState(false);
  const token = useAppSelector(state => state.currentUser.token);
  const userId = useAppSelector(state => state.currentUser.user?._id);

  useEffect(() => {
    postsOperations.getAllPosts().then(data => {
      if (data) {
        setPosts(data);
      }
    });
  }, []);

  const addPostHandler = () => {
    if (token) {
      return setNewPostBackdrop(!newPostBackdrop);
    }

    toast(`Login first, please!`);
    history.push('login');
  };

  const showUserPostsHandler = () => {
    if (token) {
      return history.push('current-user-posts');
    }

    toast(`Login first, please!`);
    history.push('login');
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

  const deletePost = (postId: string) => {
    if (userId) {
      postsOperations.deletePostFromAll(postId).then(data => setPosts(data));
    }
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
              onClick={addPostHandler}
            >
              ADD NEW POST
            </button>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={showUserPostsHandler}
            >
              SHOW MY POSTS
            </button>
          </div>
          <CurrentUserPostsList posts={posts} deletePost={deletePost} />
        </section>
      ) : (
        <Spinner />
      )}

      <PostsBackdrop
        isOpen={newPostBackdrop}
        editOrCreate={false}
        createNewPost={createNewPost}
        newPostBackdrop={newPostBackdrop}
        setNewPostBackdrop={setNewPostBackdrop}
      />
    </>
  );
};
export default Posts;
