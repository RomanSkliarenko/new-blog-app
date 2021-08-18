import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const currentUser = useSelector((state) => state.users.currentAuthUser);
  return (
    <div>
      <h2>Profile page</h2>
      {currentUser ? (
        <>
          <p>User name : {currentUser.name}</p>
          <p>User email : {currentUser.email}</p>
        </>
      ) : null}
    </div>
  );
}
