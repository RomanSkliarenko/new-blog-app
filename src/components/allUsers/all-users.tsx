import React, { useEffect, useState } from 'react';
import { RouteChildrenProps, useHistory } from 'react-router-dom';
import usersApi from '../../servises/users-api';
import Loader from 'react-loader-spinner';
import style from './allUsers.module.css';
import IUser from '../../common/User.interface';

const AllUsers: React.FC<RouteChildrenProps> = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const history = useHistory();

  useEffect(() => {
    usersApi.fetchUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <>
      {users ? (
        <section className={style.usersContainer}>
          <h2 className={style.pageTitle}>All Users page</h2>
          <ul className={style.usersList}>
            {users?.map((user: IUser) => (
              <li key={user._id} className={style.usersListItem}>
                <span className={style.userName}>{user.name}</span>
                <button
                  className={style.itemBtn}
                  type="button"
                  onClick={() => {
                    history.push(`/all-users/${user._id}`);
                  }}
                >
                  details
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <Loader
          className="spinner"
          type="BallTriangle"
          color="#7f0000"
          height={80}
          width={80}
        />
      )}
    </>
  );
};
export default AllUsers;
