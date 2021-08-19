import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import usersOperations from "../redux/users/users-operations";

export default function AllUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersOperations.getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let history = useHistory();
  const allUsers = useSelector((state) => state.users.allUsers);
  return (
    <>
      <h2>All Users page</h2>
      <ul>
        {allUsers
          ? allUsers.map((user) => (
              <li key={user._id}>
                Name{user.name}{" "}
                <button
                  type="button"
                  onClick={() => {
                    history.push(`/all-users/${user._id}`);
                  }}
                >
                  See more
                </button>
              </li>
            ))
          : null}
      </ul>
    </>
  );
}
