import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import Login from './components/login/login';
import Navigation from './components/navigation/navigation';
import NotFound from './components/notFound/notFound';
import Posts from './components/posts/posts';
import Profile from './components/profile/profile';
import SignUp from './components/signUp/signUp';
import AllUsers from './components/allUsers/all-users';
import SelectedPost from './components/selectedPost/selected-post';
import SelectedUser from './components/selectedUser/selected-user';
import CurrentUserPosts from './components/currentUserPosts/currentUserPosts';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <>
    <Route path="/" component={Navigation} />
    <ToastContainer theme="dark" position="bottom-right" />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new-ficus-app" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/posts" exact component={Posts} />
      <Route path="/posts/:id" component={SelectedPost} />
      <PrivateRoute
        path="/current-user-posts"
        exact
        component={CurrentUserPosts}
        redirectTo="/login"
      />
      <Route path="/current-user-posts/:id" component={SelectedPost} />
      <PrivateRoute path="/profile" redirectTo="/login" component={Profile} />
      <Route path="/all-users" exact component={AllUsers} />
      <Route path="/all-users/:id" component={SelectedUser} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default App;
