import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import usersOperations from "../../redux/users/users-operations";
import userAvatr from "../../images/user-default-avatar.png";
import style from "./selectedUser.module.css";

export default function SelectedUser() {
  const [selectedUser, setSelectedUser] = useState({});
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    usersOperations.getSelectedUser(id).then((data) => setSelectedUser(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={style.selectedUserSection}>
      <button
        className={style.sectionNavBtn}
        type="button"
        onClick={() => {
          history.push("/all-users");
        }}
      >
        BACK
      </button>
      <h2 className={style.userName}>{selectedUser?.name}</h2>
      <div className={style.userDetailsWrapper}>
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
            src={`${process.env.REACT_APP_BACKEND_URL}${selectedUser.avatar}`}
            onError={(e) => {
              e.target.src = userAvatr;
            }}
            alt="user-avatar"
          />
        </div>
      </div>
    </section>
  );
}
