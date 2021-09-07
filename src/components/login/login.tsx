import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import usersOperations from '../../redux/users/users-operations';
import style from './login.module.css';
import { loginSchema } from '../../servises/validationSchema';

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitHandler = (user: { email: string; password: string }) => {
    dispatch(usersOperations.login(user));
    history.push('/');
  };

  return (
    <div className={style.loginWrapper}>
      <h2 className={style.loginTitle}>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={onSubmitHandler}
      >
        <Form>
          <ErrorMessage name="email" component="div" className="errorMsg" />
          <ErrorMessage name="password" component="div" className="errorMsg" />
          <label htmlFor="email">Email: </label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
            className={style.loginInput}
            autoFocus
          />
          <label htmlFor="password">Password: </label>
          <Field
            id="password"
            name="password"
            placeholder="************"
            className={style.loginInput}
          />

          <button type="submit" className={style.sectionNavBtn}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
