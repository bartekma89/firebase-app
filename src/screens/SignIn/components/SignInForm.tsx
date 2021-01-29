import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import { useFirebaseContext } from "../../../services/hooks";
import { Routes } from "../../../constants/routes";

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: "",
  password: "",
};

const validationSchema: yup.SchemaOf<Values> = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

export default function SignInForm() {
  const [error, setError] = useState<{
    message: string | null;
  }>({
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
      await firebaseContext.auth?.signInWithEmailAndPassword(
        values.email,
        values.password
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
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>
      <div>
        <button type="submit" disabled={formik.isSubmitting}>
          Sign In
        </button>
      </div>
      <br />
      {error ? <div>{error.message}</div> : null}
    </form>
  );
}
