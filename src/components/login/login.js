import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import usersOperations from "../../redux/users/users-operations";

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
          dispatch(usersOperations.login({ email, password }));
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
