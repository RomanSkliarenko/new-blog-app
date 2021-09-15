import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import style from './navigation.module.css';
import AuthUserNav from './authUserNav';
import route from '../../common/constants/routeConstant';

const Navigation: React.FC = () => {
  const currentUser = useAppSelector(state => state.currentUser.user);

  return (
    <nav className={style.navContainer}>
      {currentUser
        ? route.AUTH_ROUTES.map(singleRoute => (
            <NavLink
              key={singleRoute.path}
              exact
              className={style.base}
              activeClassName={style.active}
              to={singleRoute.path}
            >
              {singleRoute.name}
            </NavLink>
          ))
        : route.ROUTES.map(singleRoute => (
            <NavLink
              key={singleRoute.path}
              exact
              className={style.base}
              activeClassName={style.active}
              to={singleRoute.path}
            >
              {singleRoute.name}
            </NavLink>
          ))}
      {currentUser && <AuthUserNav currentUser={currentUser} />}
    </nav>
  );
};
export default Navigation;
