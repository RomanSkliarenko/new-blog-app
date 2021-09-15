import { useHistory } from 'react-router-dom';
import IUser from '../../common/User.interface';
import style from './singleUser.module.css';
import btnTitle from '../../common/constants/buttonTitle';

interface IProps {
  user: Partial<IUser>;
}

const SingleUser = ({ user: { _id: userId, name } }: IProps): JSX.Element => {
  const history = useHistory();
  const detailsBtnHandler = () => history.push(`/all-users/${userId}`);

  return (
    <li className={style.usersListItem}>
      <span className={style.userName}>{name}</span>
      <button
        className={style.itemBtn}
        type="button"
        onClick={detailsBtnHandler}
      >
        {btnTitle.DETAILS}
      </button>
    </li>
  );
};

export default SingleUser;
