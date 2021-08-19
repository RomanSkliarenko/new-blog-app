import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import userActions from "../redux/users/users-action";
import usersOperations from "../redux/users/users-operations";

export default function SelectedUser(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersOperations.setSelectedUser(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          dispatch(userActions.setSelectedUser(null));
          history.push("/all-users");
        }}
      >
        BACK
      </button>
      <h2>{selectedUser ? selectedUser.name : null}</h2>
      {selectedUser ? (
        <>
          <p>User name : {selectedUser.name}</p>
          <p>User email : {selectedUser.email}</p>
        </>
      ) : null}
    </div>
  );
}
