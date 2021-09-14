import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PostsBackdrop from '../postsBackdrop/posts-backdrop';
import postsOperations from '../../redux/posts/post-operations';
import style from './currentUserPosts.module.css';
import { toast } from 'react-toastify';
import IPost from '../../common/Post.interface';
import IPostFields from '../../common/PostFields.interface';
import { useAppSelector } from '../../redux/store';
import Spinner from '../spinner/spinner';
import CurrentUserPostsList from '../currentUserPostsList/currentUserPostsList';

const CurrentUserPosts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>();
  const history = useHistory();
  const [newPostBackdrop, setNewPostBackdrop] = useState(false);
  const userId = useAppSelector(state => state.currentUser.user?._id);

  const getCurrentUserPosts = () => {
    if (userId) {
      postsOperations.getCurrentUserPosts(userId).then(res => setPosts(res));
    }
  };

  useEffect(() => {
    getCurrentUserPosts();
  }, []);

  const createNewPost = (values: IPostFields) => {
    postsOperations.createNewPost(values).then(data => {
      if (data) {
        setPosts(
          data.filter((singlePost: IPost) => singlePost.postedBy === userId),
        );
      }
    });

    setNewPostBackdrop(!newPostBackdrop);
    toast(`Note added successfully`);
  };

  // useCallback
  const deletePost = (postId: string) => {
    if (userId) {
      postsOperations.deletePost(postId, userId).then(data => setPosts(data));
    }
  };

  const newPostBackdropHandler = () => setNewPostBackdrop(!newPostBackdrop);

  const showAllPostHandler = () => history.push('/posts');

  return (
    <>
      {posts ? (
        <section className={style.postsContainer}>
          <h2 className={style.pageTitle}>My posts page</h2>
          <div className={style.sectionNavBtnContainer}>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={newPostBackdropHandler}
            >
              ADD NEW POST
            </button>
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={showAllPostHandler}
            >
              SHOW ALL POSTS
            </button>
          </div>
          <CurrentUserPostsList posts={posts} deletePost={deletePost} />
        </section>
      ) : (
        <Spinner />
      )}

      {newPostBackdrop && (
        <PostsBackdrop
          editOrCreate={false}
          createNewPost={createNewPost}
          newPostBackdrop={newPostBackdrop}
          setNewPostBackdrop={setNewPostBackdrop}
        />
      )}
    </>
  );
};

export default CurrentUserPosts;
