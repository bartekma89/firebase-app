import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import { useFirebaseContext } from "../../../services/hooks";
import { Routes } from "../../../constants/routes";

interface Values {
  userName: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
}

const initialValues: Values = {
  userName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
};

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  passwordOne: yup.string().min(6, "Minimum 6 characters").required("Required"),
  passwordTwo: yup
    .string()
    .oneOf([yup.ref("passwordOne")], "Password's not match")
    .required("Required"),
});

export default function SignUpForm() {
  const [error, setError] = useState<{ message: string | null }>({
    message: null,
  });
  const firebaseContext = useFirebaseContext();
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) {
    try {
      await firebaseContext.auth?.createUserWithEmailAndPassword(
        values.email,
        values.passwordOne
      );
      resetForm();
      setSubmitting(false);
      history.push(Routes.HOME);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="userName">User name: </label>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={formik.handleChange}
          placeholder="Full Name"
          value={formik.values.userName}
        />
        {formik.errors.userName && formik.touched.userName ? (
          <div>{formik.errors.userName}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={formik.handleChange}
          placeholder="Email"
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="passwordOne">Password: </label>
        <input
          type="password"
          name="passwordOne"
          id="passwordOne"
          onChange={formik.handleChange}
          placeholder="Password"
          value={formik.values.passwordOne}
        />
        {formik.errors.passwordOne && formik.touched.passwordOne ? (
          <div>{formik.errors.passwordOne}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="passwordTwo">Confirm Password: </label>
        <input
          type="password"
          name="passwordTwo"
          id="passwordTwo"
          onChange={formik.handleChange}
          placeholder="ConfirmPassword"
          value={formik.values.passwordTwo}
        />
        {formik.errors.passwordTwo && formik.touched.passwordTwo ? (
          <div>{formik.errors.passwordTwo}</div>
        ) : null}
      </div>
      <div>
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </div>
      <br />
      {error ? <div>{error.message}</div> : null}
    </form>
  );
}