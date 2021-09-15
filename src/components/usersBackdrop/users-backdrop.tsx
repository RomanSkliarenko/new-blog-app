import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import usersOperations from '../../redux/users/users-operations';
import style from './usersBackdrop.module.css';
import { IProp, IValues } from './user-backdrop.interface';
import { useAppSelector } from '../../redux/store';
import btnTitle from '../../common/constants/buttonTitle';

const UsersBackdrop: React.FC<IProp> = ({ setEditUserFlag, editUserFlag }) => {
  const dispatch = useDispatch();
  const currentAuthUser = useAppSelector(state => state.currentUser.user);
  const initValues = {
    name: currentAuthUser?.name || '',
    extra_details: currentAuthUser?.extra_details || '',
    skills: currentAuthUser?.skills || '',
    profession: currentAuthUser?.profession || '',
    details: currentAuthUser?.details || '',
  };
  const onSubmit = (values: IValues) => {
    if (currentAuthUser) {
      dispatch(usersOperations.editUser(currentAuthUser._id, values));
      setEditUserFlag(!editUserFlag);
    }
  };
  return (
    <div className={style.backdrop}>
      <div className={style.backdropFormWrapper}>
        <button
          className={style.backdropCloseBtn}
          type="button"
          onClick={() => setEditUserFlag(!editUserFlag)}
        >
          {btnTitle.BACKDROP_CLOSE}
        </button>
        <h2 className={style.backdropFormTitle}>Edit your profile</h2>
        <Formik
          initialValues={initValues}
          onSubmit={values => onSubmit(values)}
        >
          <Form className={style.backdropForm}>
            <label htmlFor="name">
              Name :
              <Field
                id="name"
                name="name"
                className={style.backdropInput}
                autoFocus
              />
            </label>
            <label htmlFor="extra_details">Extra details:</label>
            <Field
              id="extra_details"
              name="extra_details"
              className={style.backdropInput}
            />
            <label htmlFor="skills">Skills:</label>
            <Field id="skills" name="skills" className={style.backdropInput} />
            <label htmlFor="profession">Profession:</label>
            <Field
              id="profession"
              name="profession"
              className={style.backdropInput}
            />
            <label htmlFor="details">Details:</label>
            <Field
              id="details"
              name="details"
              className={style.backdropInput}
            />
            <button type="submit" className={style.backdropFormAddBtn}>
              {btnTitle.EDIT}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UsersBackdrop;
