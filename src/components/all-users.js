import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../redux/users/users-action";
import { useHistory } from "react-router-dom";

export default function AllUsers() {
  let history = useHistory();

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.allUsers);
  useEffect(() => {
    axios
      .get("/users?limit=10")
      .then(function ({ data }) {
        dispatch(userActions.getAllUsers(data));
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
