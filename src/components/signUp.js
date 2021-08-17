import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";

export default function SignUp() {
  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          axios
            .post("/users", {
              email: values.email,
              password: values.password,
              name: values.name,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" placeholder="Jane" />
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
