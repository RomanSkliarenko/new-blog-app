import React, { useEffect, useState } from 'react';
import usersApi from '../../servises/users-api';
import style from './allUsers.module.css';
import IUser from '../../common/User.interface';
import Spinner from '../spinner/spinner';
import UserList from '../userList/userList';

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    usersApi.fetchUsers().then(res => setUsers(res.data));
  }, []);

  return (
    <>
      {users.length ? (
        <section className={style.usersContainer}>
          <h2 className={style.pageTitle}>All Users page</h2>
          <UserList users={users} />
        </section>
      ) : (
        <Spinner />
      )}
    </>
  );
};
export default AllUsers;
