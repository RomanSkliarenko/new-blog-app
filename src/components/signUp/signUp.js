import React from "react";
import { useDispatch } from "react-redux";
import usersOperations from "../../redux/users/users-operations";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import style from "./signUp.module.css";
import axios from "axios";

export default function SignUp() {
  const dispatch = useDispatch();
  let history = useHistory();

  return (
    <div className={style.signUpWrapper}>
      <h2 className={style.signUpTitle}>Sign Up</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password, name }) => {
          axios
            .post("/users", {
              email,
              password,
              name,
            })
            .then(function (_) {
              dispatch(usersOperations.login({ email, password }));
              history.push("/");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        <Form>
          <label htmlFor="name">Name: </label>
          <Field
            id="name"
            name="name"
            placeholder="Jane"
            className={style.signUpInput}
          />
          <label htmlFor="email">Email: </label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
            className={style.signUpInput}
          />
          <label htmlFor="password">Password: </label>
          <Field
            id="password"
            name="password"
            className={style.signUpInput}
            placeholder="**************"
          />
          <button type="submit" className={style.sectionNavBtn}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
