import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import usersOperations from "../../redux/users/users-operations";
import style from "./navigation.module.css";
const linkStyles = {
  base: {
    color: "black",
    textDecoration: "none",
    fontWeight: 700,
  },

  active: {
    fontWeight: 800,
    borderTop: "4px solid green",
    fontSize: 27,
  },
};

export default function Navigation() {
  let history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentAuthUser);
  useEffect(() => {}, []);
  return (
    <nav className={style.navContainer}>
      <NavLink
        exact
        style={linkStyles.base}
        activeStyle={linkStyles.active}
        to={{
          pathname: "/",
        }}
      >
        HOME
      </NavLink>
      <NavLink
        exact
        style={linkStyles.base}
        activeStyle={linkStyles.active}
        to={{
          pathname: "/posts",
        }}
      >
        POSTS
      </NavLink>
      <NavLink
        exact
        style={linkStyles.base}
        activeStyle={linkStyles.active}
        to={{
          pathname: "/all-users",
        }}
      >
        ALL USERS
      </NavLink>
      {currentUser.name ? null : (
        <NavLink
          exact
          style={linkStyles.base}
          activeStyle={linkStyles.active}
          to={{
            pathname: "/sign-up",
          }}
        >
          SIGNUP
        </NavLink>
      )}
      {currentUser.name ? null : (
        <NavLink
          exact
          style={linkStyles.base}
          activeStyle={linkStyles.active}
          to={{
            pathname: "/login",
          }}
        >
          LOGIN
        </NavLink>
      )}
      {currentUser.name ? (
        <NavLink
          exact
          style={linkStyles.base}
          activeStyle={linkStyles.active}
          to={{
            pathname: "/profile",
          }}
        >
          PROFILE
        </NavLink>
      ) : null}

      {currentUser.name ? (
        <div className={style.logoutContainer}>
          <h2 className={style.userName}>Hello, {currentUser.name}!</h2>
          <button
            className={style.logoutBtn}
            type="button"
            onClick={() => {
              dispatch(usersOperations.logout());
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
