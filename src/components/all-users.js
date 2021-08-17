import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userActions from "../redux/users/users-action";

export default function AllUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.allUsers);
  useEffect(() => {
    axios
      .get("/users?limit=50")
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
          ? allUsers.map((user) => <li key={user._id}>Name{user.name}</li>)
          : null}
      </ul>
    </>
  );
}
