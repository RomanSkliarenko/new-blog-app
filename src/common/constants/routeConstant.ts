interface IRoute {
  path: string;
  name: string;
}
const AUTH_ROUTES: Array<IRoute> = [
  {
    name: 'HOME',
    path: '/',
  },
  {
    name: 'POSTS',
    path: '/posts',
  },
  {
    name: 'ALL USERS',
    path: '/all-users',
  },
  {
    name: 'PROFILE',
    path: '/profile',
  },
];
const ROUTES: Array<IRoute> = [
  {
    name: 'HOME',
    path: '/',
  },
  {
    name: 'POSTS',
    path: '/posts',
  },
  {
    name: 'ALL USERS',
    path: '/all-users',
  },
  {
    name: 'SIGN UP',
    path: '/sign-up',
  },
  {
    name: 'LOGIN',
    path: '/login',
  },
];

export default { AUTH_ROUTES, ROUTES };
