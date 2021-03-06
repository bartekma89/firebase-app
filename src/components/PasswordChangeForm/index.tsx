import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import { useAuthContext } from "../../services/hooks";

interface Values {
  passwordOne: string;
  passwordTwo: string;
}

const initialValues: Values = {
  passwordOne: "",
  passwordTwo: "",
};

const validationSchema: yup.SchemaOf<Values> = yup.object().shape({
  passwordOne: yup.string().min(6, "Minimum 6 characters").required("Required"),
  passwordTwo: yup
    .string()
    .oneOf([yup.ref("passwordOne")], "Password's not match")
    .required("Required"),
});

export function PasswordChangeForm() {
  const [error, setError] = useState<{ message: string | null }>({
    message: null,
  });
  const authContext = useAuthContext();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) {
    try {
      authContext.doPasswordUpdate!(values.passwordOne)?.then(() => {
        resetForm();
        setSubmitting(false);
      });
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="passwordOne">New password</label>
        <input
          type="text"
          name="passwordOne"
          id="passwordOne"
          onChange={formik.handleChange}
          placeholder="New password"
          value={formik.values.passwordOne}
        />
        {formik.errors.passwordOne && formik.touched.passwordOne ? (
          <div>{formik.errors.passwordOne}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="passwordTwo">Confirm Password</label>
        <input
          type="text"
          name="passwordTwo"
          id="passwordTwo"
          onChange={formik.handleChange}
          placeholder="Confirmed Password"
          value={formik.values.passwordTwo}
        />
        {formik.errors.passwordTwo && formik.touched.passwordTwo ? (
          <div>{formik.errors.passwordTwo}</div>
        ) : null}
      </div>
      <button type="submit" disabled={formik.isSubmitting}>
        Reset My Password
      </button>

      <br />
      {error ? <div>{error.message}</div> : null}
    </form>
  );
}
