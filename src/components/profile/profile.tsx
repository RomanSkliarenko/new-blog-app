import React, { useState } from 'react';
import UsersBackdrop from '../usersBackdrop/users-backdrop';
import style from './profile.module.css';
import { useAppSelector } from '../../redux/store';
import { RouteChildrenProps } from 'react-router-dom';
import ProfileControlMenu from './profileControlMenu';
import ProfileDetails from './profileDetails';

const Profile: React.FC<RouteChildrenProps> = () => {
  const [editUserFlag, setEditUserFlag] = useState<boolean>(false);
  const currentAuthUser = useAppSelector(state => state.currentUser.user);

  return (
    <section className={style.profileSectionContainer}>
      <div className={style.profileName}>
        {currentAuthUser && <h2>{currentAuthUser.name} profile page</h2>}
      </div>
      <ProfileControlMenu
        setEditUserFlag={setEditUserFlag}
        editUserFlag={editUserFlag}
      />
      <ProfileDetails currentAuthUser={currentAuthUser} />
      {editUserFlag && (
        <UsersBackdrop
          editUserFlag={editUserFlag}
          setEditUserFlag={setEditUserFlag}
        />
      )}
    </section>
  );
};

export default Profile;
