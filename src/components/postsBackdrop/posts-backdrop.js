import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import style from "./postsBackdrop.module.css";

export default function PostsBackdrop({
  setNewPostBackdrop, //set flag
  newPostBackdrop, //flag
  action,
  currentPost,
  editOrCreate,
}) {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setEdit(editOrCreate); //flag for backdrop title
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {edit ? "Edit your post" : "Create new post"}
        </h2>
        <Formik
          initialValues={{
            title: currentPost ? currentPost.title : "",
            fullText: currentPost ? currentPost.fullText : "",
            description: currentPost ? currentPost.description : "",
          }}
          onSubmit={async ({ title, fullText, description }) => {
            action({ title, fullText, description }, currentPost?._id);
          }}
        >
          <Form className="backdrop-form">
            <label htmlFor="title">Name:</label>
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
              {edit ? "EDIT" : "ADD POST"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
