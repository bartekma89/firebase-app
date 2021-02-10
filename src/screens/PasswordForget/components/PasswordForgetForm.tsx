import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import { useAuthContext } from "../../../services/hooks";

interface Values {
  email: string;
}

const initialValues: Values = {
  email: "",
};

const validationSchema: yup.SchemaOf<Values> = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
});

export default function PasswordForgetForm() {
  const [error, setError] = useState<{ message: string | null }>({
    message: null,
  });
  const authContext = useAuthContext();

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
      await authContext.doPasswordReset!(values.email);
      resetForm();
      setSubmitting(false);
      setError({ message: null });
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email: </label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={formik.handleChange}
        placeholder="Email Address"
        value={formik.values.email}
      />
      {formik.errors.email && formik.touched.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <button type="submit" disabled={formik.isSubmitting}>
        Reset My Password
      </button>
      <br />
      {error ? <div>{error.message}</div> : null}
    </form>
  );
}
