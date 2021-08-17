import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import userActions from "../redux/users/users-action";

export default function Navigation() {
  let history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <nav>
      <Link
        to={{
          pathname: "/",
        }}
      >
        HOME
      </Link>
      <Link
        to={{
          pathname: "/posts",
        }}
      >
        POSTS
      </Link>
      <Link
        to={{
          pathname: "/all-users",
        }}
      >
        ALL USERS
      </Link>
      {currentUser ? null : (
        <Link
          to={{
            pathname: "/sign-up",
          }}
        >
          SIGNUP
        </Link>
      )}
      {currentUser ? null : (
        <Link
          to={{
            pathname: "/login",
          }}
        >
          LOGIN
        </Link>
      )}
      {currentUser ? (
        <Link
          to={{
            pathname: "/profile",
          }}
        >
          PROFILE
        </Link>
      ) : null}

      {currentUser ? (
        <div className="user-logout">
          <h2 className="user-name">Hello {currentUser.name}</h2>
          <button
            type="button"
            onClick={() => {
              dispatch(userActions.removeUser());
              dispatch(userActions.removeUserToken());
              localStorage.removeItem("user");
              localStorage.removeItem("user-token");
              history.push("/");
            }}
          >
            LogOut
          </button>
        </div>
      ) : null}
    </nav>
  );
}
