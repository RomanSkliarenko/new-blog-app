import React from 'react';
import IUser from '../../common/User.interface';
import SingleUser from '../singleUser/singleUser';
import style from './userList.module.css';

const UserList: React.FC<{ users: IUser[] }> = React.memo(({ users }) => (
  <ul className={style.usersList}>
    {users.map(user => (
      <SingleUser key={user._id} user={user} />
    ))}
  </ul>
));

export default UserList;
