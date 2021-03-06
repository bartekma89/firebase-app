import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import { useRouter } from "../../../services/hooks";
import { useAuthContext } from "../../../services/hooks";
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

export function SignInForm() {
  const [error, setError] = useState<{
    message: string | null;
  }>({
    message: null,
  });
  const authContext = useAuthContext();
  const { history } = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) {
    authContext.doSignInWithEmailAndPassword!(values.email, values.password)
      .then(() => {
        resetForm();

        history.push(Routes.HOME);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setSubmitting(false);
      });
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
