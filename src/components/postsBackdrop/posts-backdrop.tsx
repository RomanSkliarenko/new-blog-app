import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import style from './postsBackdrop.module.css';
import { newPostSchema } from '../../servises/validationSchema';
import { IProps } from './postBackdrop.interface';
import IPostFields from '../../common/PostFields.interface';

// eslint-disable-next-line no-shadow
enum Label {
  Edit = 'EDIT',
  Submit = 'SUBMIT',
  EditPost = 'Edit your post',
  CreatePost = 'Create new post',
}

const PostsBackdrop: React.FC<IProps> = ({
  isOpen,
  setNewPostBackdrop,
  newPostBackdrop,
  createNewPost,
  editPost,
  currentPost,
  editOrCreate,
}) => {
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    setEdit(editOrCreate);
  }, [editOrCreate]);

  const action = (values: IPostFields) => {
    if (editPost && currentPost?._id) {
      editPost(values, currentPost._id);
    }
    if (createNewPost) {
      createNewPost(values);
    }
  };
  const newPostBackdropHandler = () => setNewPostBackdrop(!newPostBackdrop);

  const initValues = {
    title: currentPost?.title || '',
    fullText: currentPost?.fullText || '',
    description: currentPost?.description || '',
  };

  if (!isOpen) return null;

  return (
    <div className={style.backdrop}>
      <div className={style.backdropFormWrapper}>
        <button
          className={style.backdropCloseBtn}
          type="button"
          onClick={newPostBackdropHandler}
        >
          x
        </button>
        <h2 className={style.backdropFormTitle}>
          {edit ? Label.EditPost : Label.CreatePost}
        </h2>
        <Formik
          initialValues={initValues}
          validationSchema={newPostSchema}
          onSubmit={action}
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
              {edit ? Label.Edit : Label.Submit}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PostsBackdrop;
