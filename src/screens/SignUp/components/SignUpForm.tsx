import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import { useAuthContext, useRouter } from "../../../services/hooks";
import { Routes } from "../../../constants/routes";
import { useDbFirebase } from "../../../services/hooks";
import { Roles } from "../../../constants/roles";

interface Values {
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  isAdmin?: boolean;
}

const initialValues: Values = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
};

const validationSchema: yup.SchemaOf<Values> = yup.object().shape({
  username: yup
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
  isAdmin: yup.boolean().notRequired(),
});

export function SignUpForm() {
  const [error, setError] = useState<{ message: string | null }>({
    message: null,
  });
  const authContext = useAuthContext();
  const { history } = useRouter();
  const db = useDbFirebase();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) {
    authContext.doSignUpWithEmailAndPassword!(values.email, values.passwordOne)
      .then((authUser) => {
        let role = values.isAdmin ? Roles.ADMIN : Roles.USER;

        return db
          .user(authUser!.uid)
          .set({ username: values.username, email: values.email, role });
      })
      .then(() => {
        resetForm();
        history.push(Routes.HOME);
      })
      .catch((error) => setError(error))
      .finally(() => setSubmitting(false));
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="username">User name: </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={formik.handleChange}
          placeholder="Full Name"
          value={formik.values.username}
        />
        {formik.errors.username && formik.touched.username ? (
          <div>{formik.errors.username}</div>
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
        <label htmlFor="isAdmin">Admin: </label>
        <input
          type="checkbox"
          name="isAdmin"
          id="isAdmin"
          onChange={formik.handleChange}
          checked={formik.values.isAdmin}
        />
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
