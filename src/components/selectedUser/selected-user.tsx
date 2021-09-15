import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import usersOperations from '../../redux/users/users-operations';
import userAvatr from '../../images/user-default-avatar.png';
import style from './selectedUser.module.css';
import IUser from '../../common/User.interface';
import Loader from 'react-loader-spinner';
import btnTitle from '../../common/constants/buttonTitle';

interface IId {
  id: string;
}

const SelectedUser: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const { id } = useParams<IId>();
  const history = useHistory();

  const backBtnHandler = useCallback(
    () => history.push('/all-users'),
    [history],
  );
  const imageErrorHandler = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = userAvatr;
  };

  useEffect(() => {
    usersOperations.getSelectedUser(id).then(data => {
      if (data) {
        setSelectedUser(data);
      }
    });
  }, [id]);

  return selectedUser ? (
    <section className={style.selectedUserSection}>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={backBtnHandler}
      >
        {btnTitle.BACK}
      </button>
      <h2 className={style.userName}>{selectedUser.name}</h2>
      <div className={style.userDetailsWrapper}>
        <ul className={style.userDetails}>
          <li className={style.userDetailsItem}>
            <span className={style.userDetailsItemTitle}>User name :</span>{' '}
            {selectedUser.name}
          </li>
          <li className={style.userDetailsItem}>
            <span className={style.userDetailsItemTitle}>User email :</span>{' '}
            {selectedUser.email}
          </li>
          <li className={style.userDetailsItem}>
            <span className={style.userDetailsItemTitle}>Date created :</span>{' '}
            {selectedUser.dateCreated}
          </li>
        </ul>
        <div>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${selectedUser.avatar}`}
            onError={imageErrorHandler}
            alt="user-avatar"
          />
        </div>
      </div>
    </section>
  ) : (
    <Loader
      className="spinner"
      type="BallTriangle"
      color="#7f0000"
      height={80}
      width={80}
    />
  );
};

export default SelectedUser;
