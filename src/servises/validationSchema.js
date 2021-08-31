import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Enter password"),
  email: Yup.string().email("Invalid email").required("Enter email"),
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Enter your name"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Enter password"),
  email: Yup.string().email("Invalid email").required("Enter email"),
});

export const newPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Enter post title"),
  fullText: Yup.string()
    .min(20, "Too Short!")
    .max(1000, "Too Long!")
    .required("Enter post text"),
  description: Yup.string()
    .required("Enter description")
    .max(1000, "Too Long!"),
});
