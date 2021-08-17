import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Home from "./components/home";
import Login from "./components/login";
import Navigation from "./components/navigation";
import NotFound from "./components/notFound";
import Posts from "./components/posts";
import Profile from "./components/profile";
import SignUp from "./components/signUp";
import axios from "axios";
import AllUsers from "./components/all-users";
import userActions from "./redux/users/users-action";
import SelectedPost from "./components/selected-post";

function App() {
  axios.defaults.baseURL = "https://nodejs-test-api-blog.herokuapp.com/api/v1";
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("user-token");
    if (user) {
      dispatch(userActions.getUser(JSON.parse(user)));
    }
    if (token) {
      dispatch(userActions.getUserToken(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/posts" exact component={Posts} />
        <Route path="/posts/:id" component={SelectedPost} />
        <Route path="/profile" component={Profile} />
        <Route path="/all-users" component={AllUsers} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
