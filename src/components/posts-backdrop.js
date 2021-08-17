import React from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useSelector } from "react-redux";

export default function PostsBackdrop({ setNewPostBackdrop, newPostBackdrop }) {
  const token = useSelector((state) => state.users.token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return (
    <div className="backdrop">
      <div className="backdrop-form-wrapper">
        <button
          className="close-backdrop-btn"
          type="button"
          onClick={() => setNewPostBackdrop(!newPostBackdrop)}
        >
          x
        </button>
        <h2 className="backdrop-form-title">Create new post</h2>
        <Formik
          initialValues={{
            title: "",
            fullText: "",
            description: "",
          }}
          onSubmit={async ({ title, fullText, description }) => {
            await axios
              .post("/posts", { title, fullText, description }, config)
              .then(function (response) {
                alert("success");
                console.log(response);
              })
              .catch(function (error) {
                alert("fail");
                console.log(error);
              });
            setNewPostBackdrop(!newPostBackdrop);
          }}
        >
          <Form className="backdrop-form">
            <label htmlFor="title">Name</label>
            <Field id="title" name="title" className="backdrop-form-input" />

            <label htmlFor="fullText">Text</label>
            <Field
              id="fullText"
              name="fullText"
              className="backdrop-form-input"
              as="textarea"
            />

            <label htmlFor="description">Description</label>
            <Field
              id="description"
              name="description"
              className="backdrop-form-input"
              type="text"
            />
            <button type="submit" className="backdrop-form-add-btn">
              ADD POST
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
