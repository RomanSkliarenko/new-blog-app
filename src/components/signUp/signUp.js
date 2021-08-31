import React from "react";
import { useDispatch } from "react-redux";
import usersOperations from "../../redux/users/users-operations";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signUpSchema } from "../../servises/validationSchema";
import style from "./signUp.module.css";

const initValues = {
  name: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const dispatch = useDispatch();
  let history = useHistory();
  const signUp = (values) => {
    dispatch(usersOperations.signUp(values));
    history.push("/");
    alert("User created success! :)");
  };
  return (
    <div className={style.signUpWrapper}>
      <h2 className={style.signUpTitle}>Sign Up</h2>
      <Formik
        initialValues={initValues}
        validationSchema={signUpSchema}
        onSubmit={(values) => signUp(values)}
      >
        <Form>
          <ErrorMessage name="name" component="div" className="errorMsg" />
          <ErrorMessage name="email" component="div" className="errorMsg" />
          <ErrorMessage name="password" component="div" className="errorMsg" />
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
