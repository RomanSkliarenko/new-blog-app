import style from './navigation.module.css';
import IUser from '../../common/User.interface';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import usersOperations from '../../redux/users/users-operations';

const AuthUserNav = ({ currentUser }: { currentUser: IUser }): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(usersOperations.logout());
    history.push('/');
  };
  return (
    <div className={style.logoutContainer}>
      <h2 className={style.userName}>Hello, {currentUser.name}!</h2>
      <button className={style.logoutBtn} type="button" onClick={logoutHandler}>
        LogOut
      </button>
    </div>
  );
};

export default AuthUserNav;
