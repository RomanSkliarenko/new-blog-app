import React from 'react';
import { NavLink, useHistory, RouteChildrenProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import usersOperations from '../../redux/users/users-operations';
import style from './navigation.module.css';
import { useAppSelector } from '../../redux/store';

// export default function Navigation() {
const Navigation: React.FC<RouteChildrenProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useAppSelector(state => state.currentUser.user);

  return (
    <nav className={style.navContainer}>
      <NavLink
        exact
        className={style.base}
        activeClassName={style.active}
        to="/"
      >
        HOME
      </NavLink>
      <NavLink
        exact
        className={style.base}
        activeClassName={style.active}
        to={{
          pathname: '/posts',
        }}
      >
        POSTS
      </NavLink>
      <NavLink
        exact
        className={style.base}
        activeClassName={style.active}
        to={{
          pathname: '/all-users',
        }}
      >
        ALL USERS
      </NavLink>
      {currentUser?.name ? null : (
        <NavLink
          exact
          className={style.base}
          activeClassName={style.active}
          to={{
            pathname: '/sign-up',
          }}
        >
          SIGNUP
        </NavLink>
      )}
      {currentUser?.name ? null : (
        <NavLink
          exact
          className={style.base}
          activeClassName={style.active}
          to={{
            pathname: '/login',
          }}
        >
          LOGIN
        </NavLink>
      )}
      {currentUser?.name ? (
        <NavLink
          exact
          className={style.base}
          activeClassName={style.active}
          to={{
            pathname: '/profile',
          }}
        >
          PROFILE
        </NavLink>
      ) : null}

      {currentUser?.name ? (
        <div className={style.logoutContainer}>
          <h2 className={style.userName}>Hello, {currentUser?.name}!</h2>
          <button
            className={style.logoutBtn}
            type="button"
            onClick={() => {
              dispatch(usersOperations.logout());
              history.push('/');
            }}
          >
            LogOut
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navigation;
