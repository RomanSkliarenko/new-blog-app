import React from 'react';
import IPost from '../../common/Post.interface';
import SinglePost from '../singlePost/singlePost';
import style from './currentUserPostsList.module.css';

interface IProps {
  posts: IPost[];
  deletePost: (postId: string) => void;
}

const CurrentUserPostsList = React.memo(({ posts, deletePost }: IProps) => (
  <ul className={style.postsList}>
    {posts?.map((post: IPost) => (
      <SinglePost key={post._id} post={post} deletePost={deletePost} />
    ))}
  </ul>
));

export default CurrentUserPostsList;
