import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import style from './postsBackdrop.module.css';
import { newPostSchema } from '../../servises/validationSchema';
import { IProps } from './postBackdrop.interface';

export default function PostsBackdrop({
  setNewPostBackdrop, // set flag
  newPostBackdrop, // flag
  action,
  currentPost,
  editOrCreate,
}: IProps) {
  const [edit, setEdit] = useState<undefined | boolean | null>(null);
  useEffect(() => {
    setEdit(editOrCreate); // flag for backdrop title
  }, []);
  const initValues = {
    title: currentPost?.title || '',
    fullText: currentPost?.fullText || '',
    description: currentPost?.description || '',
  };

  return (
    <div className={style.backdrop}>
      <div className={style.backdropFormWrapper}>
        <button
          className={style.backdropCloseBtn}
          type="button"
          onClick={() => setNewPostBackdrop(!newPostBackdrop)}
        >
          x
        </button>
        <h2 className={style.backdropFormTitle}>
          {edit ? 'Edit your post' : 'Create new post'}
        </h2>
        <Formik
          initialValues={initValues}
          validationSchema={newPostSchema}
          onSubmit={values => {
            action(values, currentPost?._id);
          }}
        >
          <Form className="backdrop-form">
            <ErrorMessage name="title" component="div" className="errorMsg" />
            <ErrorMessage
              name="fullText"
              component="div"
              className="errorMsg"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="errorMsg"
            />
            <label htmlFor="title">Title:</label>
            <Field
              id="title"
              name="title"
              className={style.backdropInput}
              placeholder="Post title"
            />

            <label htmlFor="fullText">Text:</label>
            <Field
              id="fullText"
              name="fullText"
              className={`${style.backdropInput} ${style.backdropInputText}`}
              placeholder="Your post"
              as="textarea"
            />

            <label htmlFor="description">Description:</label>
            <Field
              id="description"
              name="description"
              className={style.backdropInput}
              type="text"
              placeholder="Post description"
            />
            <button type="submit" className={style.backdropFormAddBtn}>
              {edit ? 'EDIT' : 'ADD POST'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
