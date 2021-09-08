import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import usersOperations from '../../redux/users/users-operations';
import UsersBackdrop from '../usersBackdrop/users-backdrop';
import userAvatr from '../../images/user-default-avatar.png';
import style from './profile.module.css';
import { useAppSelector } from '../../redux/store';

export default function Profile() {
  const dispatch = useDispatch();
  const [editUserFlag, setEditUserFlag] = useState<boolean>(false);
  const [currentUserAvatar, setCurrentUserAvatar] = useState<File | null>(null);
  const currentAuthUser = useAppSelector(state => state.currentUser.user);
  const avatarInput = useRef<HTMLInputElement>(null);

  const uploadAvatar = () => {
    dispatch(
      usersOperations.uploadUserAvatar(
        currentAuthUser!._id,
        currentUserAvatar!,
      ),
    );
    setCurrentUserAvatar(null);
  };

  return (
    <section className={style.profileSectionContainer}>
      <div className={style.profileName}>
        {currentAuthUser ? (
          <h2>{currentAuthUser?.name} profile page</h2>
        ) : (
          <h2> Profile page</h2>
        )}
      </div>
      <div className={style.profileNavBtnContainer}>
        <button
          className={style.sectionNavBtn}
          type="button"
          onClick={() => {
            setEditUserFlag(!editUserFlag);
          }}
        >
          Edit user
        </button>
        <button
          className={style.sectionNavBtn}
          type="button"
          onClick={() => {
            dispatch(usersOperations.deleteUser(currentAuthUser!));
          }}
        >
          Delete user
        </button>
        <button
          className={style.sectionNavBtn}
          type="button"
          onClick={() =>
            avatarInput.current ? avatarInput.current.click() : null
          }
        >
          {currentUserAvatar ? 'Add avatar' : 'Change Avatar'}
        </button>
        {currentUserAvatar ? (
          <button
            className={style.sectionNavBtn}
            type="button"
            onClick={() => uploadAvatar()}
          >
            Upload
          </button>
        ) : null}
      </div>
      <div className={style.userDetailsWrapper}>
        <ul>
          <li className={style.userDetailsItem}>
            {currentAuthUser?.name ? (
              <p>
                <span className={style.userDetailsItemTitle}>User name : </span>
                {currentAuthUser.name}
              </p>
            ) : null}
          </li>
          <li className={style.userDetailsItem}>
            {currentAuthUser?.email ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User email :{' '}
                </span>
                {currentAuthUser.email}
              </p>
            ) : null}
          </li>
          <li className={style.userDetailsItem}>
            {currentAuthUser?.extra_details ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User extra_details :
                </span>
                {currentAuthUser.extra_details}
              </p>
            ) : null}
          </li>
          <li className={style.userDetailsItem}>
            {currentAuthUser?.skills ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User skills :
                </span>
                {currentAuthUser.skills}
              </p>
            ) : null}
          </li>
          <li className={style.userDetailsItem}>
            {currentAuthUser?.profession ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User profession :
                </span>
                {currentAuthUser.profession}
              </p>
            ) : null}
          </li>

          <li className={style.userDetailsItem}>
            {currentAuthUser?.details ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User details :
                </span>
                {currentAuthUser.details}
              </p>
            ) : null}
          </li>
        </ul>
        <div>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${currentAuthUser?.avatar}`}
            onError={e => {
              e.currentTarget.src = userAvatr;
            }}
            alt="user-avatar"
          />
        </div>
      </div>
      {editUserFlag ? (
        <UsersBackdrop
          editUserFlag={editUserFlag}
          setEditUserFlag={setEditUserFlag}
        />
      ) : null}
      <input
        ref={avatarInput}
        style={{ display: 'none' }}
        type="file"
        onChange={event =>
          event.target.files
            ? setCurrentUserAvatar(event.target.files[0])
            : null
        }
      />
    </section>
  );
}
