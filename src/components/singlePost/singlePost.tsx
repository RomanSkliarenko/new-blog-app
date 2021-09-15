import style from './singlePosts.module.css';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import btnTitle from '../../common/constants/buttonTitle';
import classNames from 'classnames';

interface IProps {
  post: {
    _id: string;
    title: string;
    postedBy: string;
  };
  deletePost: (postId: string) => void;
}

const SinglePost = ({ post, deletePost }: IProps): JSX.Element => {
  const currentAuthUser = useAppSelector(state => state.currentUser.user);

  const history = useHistory();
  const { _id: postId, title, postedBy } = post;
  const detailsBtnHandler = () => history.push(`posts/${postId}`);
  const deletePostHandler = () => {
    if (deletePost) {
      deletePost(postId);
    }
  };

  return (
    <li
      key={postId}
      className={classNames(
        postedBy !== currentAuthUser?._id
          ? style.postsItem
          : `${style.currentUserPostsItem} ${style.postsItem}`,
      )}
    >
      <h3 className={style.pageTitle}>{title}</h3>
      <div className={style.sectionNavBtnContainer}>
        <button
          className={style.postsItemBtn}
          type="button"
          onClick={detailsBtnHandler}
        >
          {btnTitle.DETAILS}
        </button>
        {currentAuthUser?._id === postedBy && (
          <button
            className={style.postsItemBtn}
            type="button"
            onClick={deletePostHandler}
          >
            {btnTitle.DELETE}
          </button>
        )}
      </div>
    </li>
  );
};
export default SinglePost;
