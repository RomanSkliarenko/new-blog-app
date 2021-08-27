import React from "react";
import { Formik, Field, Form } from "formik";
import usersApi from "../../servises/users-api";
import style from "./usersBackdrop.module.css";

export default function UsersBackdrop({
  setEditUserFlag,
  editUserFlag,
  currentUser,
  fetchCurrentAuthUser,
}) {
  return (
    <div className={style.backdrop}>
      <div className={style.backdropFormWrapper}>
        <button
          className={style.backdropCloseBtn}
          type="button"
          onClick={() => setEditUserFlag(!editUserFlag)}
        >
          x
        </button>
        <h2 className={style.backdropFormTitle}>Edit your profile</h2>
        <Formik
          initialValues={{
            name: currentUser ? currentUser.name : "",
            extra_details: currentUser ? currentUser.extra_details : "",
            skills: currentUser ? currentUser.skills : "",
            profession: currentUser ? currentUser.profession : "",
            details: currentUser ? currentUser.details : "",
          }}
          onSubmit={async ({
            name,
            extra_details,
            skills,
            profession,
            details,
          }) => {
            usersApi
              .fetchPatchCurrentAuthUser(currentUser._id, {
                name,
                extra_details,
                skills,
                profession,
                details,
              })
              .then((_) => fetchCurrentAuthUser());
            setEditUserFlag(!editUserFlag);
          }}
        >
          <Form className={style.backdropForm}>
            <label htmlFor="name">Name:</label>
            <Field
              id="name"
              name="name"
              className={style.backdropInput}
              autoFocus={true}
            />
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
              EDIT
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
