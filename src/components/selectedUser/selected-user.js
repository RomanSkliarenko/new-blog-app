import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import userActions from "../../redux/users/users-action";
import usersApi from "../../servises/users-api";
import userAvatr from "../../images/user-default-avatar.png";
import style from "./selectedUser.module.css";

export default function SelectedUser() {
  const [selectedUser, setSelectedUser] = useState({});
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    usersApi
      .fetchSelectedUser(id)
      .then(function (data) {
        console.log(data);
        setSelectedUser(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={style.selectedUserSection}>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={() => {
          dispatch(userActions.setSelectedUserSuccess(null));
          history.push("/all-users");
        }}
      >
        BACK
      </button>
      <h2 className={style.userName}>{selectedUser?.name}</h2>

      <div className={style.userDetailsWrapper}>
        <>
          <ul className={style.userDetails}>
            <li className={style.userDetailsItem}>
              <span className={style.userDetailsItemTitle}>User name :</span>{" "}
              {selectedUser?.name}
            </li>
            <li className={style.userDetailsItem}>
              <span className={style.userDetailsItemTitle}>User email :</span>{" "}
              {selectedUser?.email}
            </li>
            <li className={style.userDetailsItem}>
              <span className={style.userDetailsItemTitle}>Date created :</span>{" "}
              {selectedUser?.dateCreated}
            </li>
          </ul>
          <div>
            <img
              src={/*currentUser?.avatar ? currentUser.avatar : */ userAvatr}
              alt="user-avatar"
            />
          </div>
        </>
      </div>
    </section>
  );
}
