import React from 'react';
import { Route, Redirect, RouteChildrenProps } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

interface IProps {
  redirectTo: string;
  component: React.FC<RouteChildrenProps>;
  path: string;
  exact?: boolean;
}

const PrivateRoute = ({
  component: Component,
  redirectTo,
  ...routeProps
}: IProps) => {
  const token = useAppSelector(state => state.currentUser.token); // current user

  return (
    <Route
      {...routeProps}
      render={props =>
        token ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
};

export default PrivateRoute;
