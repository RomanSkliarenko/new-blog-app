import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import userActions from "../redux/users/users-action";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password }) => {
          await axios
            .post("/auth", {
              email,
              password,
            })
            .then(function (response) {
              localStorage.setItem("user-token", response.data.token);
              dispatch(userActions.getUserToken(response.data.token));
            })
            .catch(function (error) {
              console.log(error);
            });
          await axios
            .get("/auth/user", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("user-token"),
              },
            })
            .then(function (response) {
              localStorage.setItem("user", JSON.stringify(response.data));
              dispatch(userActions.getUser(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
          history.push("/");
        }}
      >
        <Form>
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" />
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
