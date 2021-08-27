import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersApi from "../../servises/users-api";
import usersOperations from "../../redux/users/users-operations";
import { useHistory } from "react-router-dom";
import UsersBackdrop from "../usersBackdrop/users-backdrop";
import userAvatr from "../../images/user-default-avatar.png";
import style from "./profile.module.css";

export default function Profile() {
  const dispatch = useDispatch();
  let history = useHistory();
  const [editUserFlag, setEditUserFlag] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserAvatar, setcurrentUserAvatar] = useState(null);
  const currentAuthUser = useSelector((state) => state.users.currentAuthUser);
  const avatarInput = useRef();

  useEffect(() => {
    fetchCurrentAuthUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchCurrentAuthUser = () => {
    usersApi
      .fetchSelectedUser(currentAuthUser._id)
      .then((data) => setCurrentUser(data));
  };

  return (
    <section className={style.profileSectionContainer}>
      <div className={style.profileName}>
        {currentUser?.name ? (
          <h2>{currentUser.name} profile page</h2>
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
            let confirm = prompt(
              `type YES if you want delete user ${currentUser?.name} `
            );
            if (confirm === "YES" || confirm === "Yes" || confirm === "yes") {
              usersApi.fetchDeleteAuthUser(currentUser._id).then((_) => {
                dispatch(usersOperations.logout());
                history.push("/");
              });
            }
            return;
          }}
        >
          Delete user
        </button>
        <button
          className={style.sectionNavBtn}
          type="button"
          onClick={() => {
            avatarInput.current.click();
          }}
        >
          {currentUserAvatar ? "Add avatar" : "Change Avatar"}
        </button>
        {currentUserAvatar ? (
          <button
            className={style.sectionNavBtn}
            type="button"
            onClick={() => {
              usersApi
                .fetchAddUserAvatar(currentUser._id, currentUserAvatar)
                .then(function (data) {
                  console.log(data);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            Upload
          </button>
        ) : null}
      </div>
      <div className={style.userDetailsWrapper}>
        <ul>
          <li className={style.userDetailsItem}>
            {currentUser?.name ? (
              <p>
                <span className={style.userDetailsItemTitle}>User name : </span>
                {currentUser.name}
              </p>
            ) : null}
          </li>
          <li className={style.userDetailsItem}>
            {currentUser?.email ? (
              <p>
                <span className={style.userDetailsItemTitle}>User email :</span>
                {currentUser.email}
              </p>
            ) : null}
          </li>
          <li className={style.userDetailsItem}>
            {currentUser?.extra_details ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User extra_details :
                </span>
                {currentUser.extra_details}
              </p>
            ) : null}
          </li>
          <li className={style.userDetailsItem}>
            {currentUser?.skills ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User skills :
                </span>
                {currentUser.skills}
              </p>
            ) : null}
          </li>
          <li className={style.userDetailsItem}>
            {currentUser?.profession ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User profession :
                </span>
                {currentUser.profession}
              </p>
            ) : null}
          </li>

          <li className={style.userDetailsItem}>
            {currentUser?.details ? (
              <p>
                <span className={style.userDetailsItemTitle}>
                  User details :
                </span>
                {currentUser.details}
              </p>
            ) : null}
          </li>
        </ul>
        <div>
          <img
            src={/*currentUser?.avatar ? currentUser.avatar : */ userAvatr}
            alt="user-avatar"
          />
        </div>
      </div>
      {editUserFlag ? (
        <UsersBackdrop
          fetchCurrentAuthUser={fetchCurrentAuthUser}
          currentUser={currentUser}
          editUserFlag={editUserFlag}
          setEditUserFlag={setEditUserFlag}
        />
      ) : null}
      <input
        ref={avatarInput}
        style={{ display: "none" }}
        type="file"
        onChange={(event) => {
          setcurrentUserAvatar(event.target.files[0]);
        }}
      ></input>
    </section>
  );
}
