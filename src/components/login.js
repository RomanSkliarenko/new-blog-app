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
              dispatch(userActions.getUserToken(response.data.token));
              return response.data.token;
            })
            .then((token) => {
              axios
                .get("/auth/user", {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                })
                .then(function (response) {
                  dispatch(userActions.getCurrentAuthUser(response.data));
                })
                .catch(function (error) {
                  console.log(error);
                });
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
