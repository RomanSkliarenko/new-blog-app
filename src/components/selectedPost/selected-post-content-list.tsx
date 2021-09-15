import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import IPost from '../../common/Post.interface';
import style from './selected-post.module.css';
import btnTitle from '../../common/constants/buttonTitle';

interface IProps {
  currentPost: IPost;
  newCommentInputFlag: boolean;
  addComment: (newCommentInput: string) => void;
  setPostLike: () => void;
}

const SelectedPostContentList = ({
  currentPost,
  newCommentInputFlag,
  addComment,
  setPostLike,
}: IProps): JSX.Element => {
  const [newCommentInput, setNewCommentInput] = useState('');

  const addCommentHandler = () => {
    if (newCommentInput !== '') {
      setNewCommentInput('');
      return addComment(newCommentInput);
    }
    toast(`Enter something please`);
  };

  const newCommentInputHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewCommentInput(event.target.value);
    },
    [],
  );

  return (
    <ul className={style.postList}>
      <li className={style.listItem}>
        <span className={style.postTitle}>{currentPost?.title}</span>
      </li>
      <li className={style.listItem}>
        <span className={style.itemTitle}>Likes:</span>{' '}
        {currentPost.likes.length}
        <button
          type="button"
          className={style.likeButton}
          onClick={setPostLike}
        >
          {btnTitle.LIKE}
        </button>
      </li>
      <li className={style.listItem}>
        <span className={style.itemTitle}>Description:</span>{' '}
        {currentPost?.description}
      </li>
      <li className={style.listItem}>
        <span className={style.itemTitle}>Text:</span> {currentPost?.fullText}
      </li>
      <li className={style.listItem}>
        <span className={style.itemTitle}>Comments:</span>
        {newCommentInputFlag && (
          <>
            <input
              className={style.newCommentInput}
              type="text"
              onChange={newCommentInputHandler}
              value={newCommentInput}
            />
            <button
              className={style.sectionNavBtn}
              type="button"
              onClick={addCommentHandler}
            >
              {btnTitle.SEND}
            </button>
          </>
        )}
      </li>
    </ul>
  );
};
export default SelectedPostContentList;
