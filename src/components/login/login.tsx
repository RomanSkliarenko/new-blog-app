import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import usersOperations from '../../redux/users/users-operations';
import style from './login.module.css';
import { loginSchema } from '../../servises/validationSchema';
import { toast } from 'react-toastify';

const initialValues = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitHandler = (user: { email: string; password: string }) => {
    try {
      dispatch(usersOperations.login(user));
      history.push('/');
    } catch (error) {
      toast(`Note added successfully`);
    }
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
};

export default Login;
