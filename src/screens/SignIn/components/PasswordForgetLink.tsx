import { Link } from "react-router-dom";

import { Routes } from "../../../constants/routes";

export function PasswordForgetLink() {
  return (
    <p>
      <Link to={Routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  );
}
