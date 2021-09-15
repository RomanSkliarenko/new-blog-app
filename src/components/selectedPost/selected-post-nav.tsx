import style from './selected-post.module.css';
import { useHistory } from 'react-router-dom';
import IPost from '../../common/Post.interface';
import btnTitle from '../../common/constants/buttonTitle';

interface IProps {
  addCommentHandler: () => void;
  currentPost: IPost;
  userId: string;
  newPostBackDrophandler: () => void;
}

const SelectedPostNav = ({
  addCommentHandler,
  currentPost,
  userId,
  newPostBackDrophandler,
}: IProps): JSX.Element => {
  const history = useHistory();

  return (
    <div className={style.sectionNavBtnContainer}>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={() => {
          history.push('/posts');
        }}
      >
        {btnTitle.BACK}
      </button>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={addCommentHandler}
      >
        {btnTitle.ADD_COMMENT}
      </button>
      {currentPost.postedBy === userId && (
        <button
          className={style.sectionNavBtn}
          type="button"
          onClick={newPostBackDrophandler}
        >
          {btnTitle.EDIT}
        </button>
      )}
    </div>
  );
};

export default SelectedPostNav;
