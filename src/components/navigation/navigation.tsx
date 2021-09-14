import React from 'react';
import { NavLink, useHistory, RouteChildrenProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import usersOperations from '../../redux/users/users-operations';
import style from './navigation.module.css';
import { useAppSelector } from '../../redux/store';

const ROUTES: Array<{
  path: string;
  authRoute: boolean;
}> = [
  {
    path: '/',
    authRoute: false,
  },
];

const Navigation: React.FC<RouteChildrenProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useAppSelector(state => state.currentUser.user);

  const logoutHandler = () => {
    dispatch(usersOperations.logout());
    history.push('/');
  };

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
      {currentUser ? null : (
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
      {currentUser ? null : (
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
      {currentUser ? (
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

      {currentUser ? (
        <div className={style.logoutContainer}>
          <h2 className={style.userName}>Hello, {currentUser.name}!</h2>
          <button
            className={style.logoutBtn}
            type="button"
            onClick={logoutHandler}
          >
            LogOut
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navigation;
