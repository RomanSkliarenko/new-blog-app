import React, { useState, useEffect } from 'react';
import { useParams, RouteChildrenProps } from 'react-router-dom';
import commentsOperations from '../../redux/comments/comments-operations';
import postsOperations from '../../redux/posts/post-operations';
import PostsBackdrop from '../postsBackdrop/posts-backdrop';
import style from './selected-post.module.css';
import Comment from '../comment/comment';
import { toast } from 'react-toastify';
import IPost from '../../common/Post.interface';
import IComment from '../../common/Comment.interface';
import { useAppSelector } from '../../redux/store';
import IPostFields from '../../common/PostFields.interface';
import SelectedPostNav from './selected-post-nav';
import SelectedPostContentList from './selected-post-content-list';
import Spinner from '../spinner/spinner';

const SelectedPost: React.FC<RouteChildrenProps> = () => {
  const [newCommentInputFlag, setNewCommentInputFlag] = useState(false);
  const [newPostBackdrop, setNewPostBackdrop] = useState(false);
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);
  const [currentPostComments, setCurrentPostComments] = useState<
    IComment[] | null | undefined
  >(null);
  const userId = useAppSelector(state => state.currentUser.user?._id);
  const { id } = useParams<{ id: string }>();
  const getCurrentPost = () => {
    postsOperations.getSelectedPost(id).then(data => {
      if (data) {
        setCurrentPost(data);
      }
    });
  };
  const getCurrentPostComments = () => {
    commentsOperations
      .getPostComments(id)
      .then(res => setCurrentPostComments(res));
  };
  const editPost = (values: IPostFields, postId: string) => {
    postsOperations
      .editPost(values, postId)
      .then(() => getCurrentPost())
      .then(() => getCurrentPostComments());
    setNewPostBackdrop(!newPostBackdrop);
    toast(`Success`);
  };
  const addCommentHandler = () =>
    userId
      ? setNewCommentInputFlag(!newCommentInputFlag)
      : toast(`Login first, please!`);

  const setPostLike = () =>
    userId
      ? postsOperations.setPostLike(id).then(() => getCurrentPost())
      : toast(`Login first, please!`);

  const addComment = (newCommentInput: string) => {
    commentsOperations.addComment(id, newCommentInput).then(() => {
      setNewCommentInputFlag(false);
      getCurrentPostComments();
    });
  };
  const newPostBackDrophandler = () => {
    setNewPostBackdrop(!newPostBackdrop);
  };

  useEffect(() => {
    getCurrentPostComments();
    getCurrentPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {currentPost ? (
        <section className={style.sectionContainer}>
          <SelectedPostNav
            addCommentHandler={addCommentHandler}
            currentPost={currentPost}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            userId={userId!}
            newPostBackDrophandler={newPostBackDrophandler}
          />
          <SelectedPostContentList
            currentPost={currentPost}
            newCommentInputFlag={newCommentInputFlag}
            addComment={addComment}
            setPostLike={setPostLike}
          />
          <ul className={style.postList}>
            {currentPostComments?.map((comment: IComment) => (
              <Comment
                key={comment._id}
                authUser={!!userId}
                sigleComment={comment}
                getCurrentPostComments={getCurrentPostComments}
                userId={userId}
              />
            ))}
          </ul>
        </section>
      ) : (
        <Spinner />
      )}

      <PostsBackdrop
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        currentPost={currentPost!}
        isOpen={newPostBackdrop}
        editPost={editPost}
        newPostBackdrop={newPostBackdrop}
        setNewPostBackdrop={setNewPostBackdrop}
        editOrCreate
      />
    </>
  );
};

export default SelectedPost;
