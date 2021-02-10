import { Link } from "react-router-dom";

import { Routes } from "../../../constants/routes";

export default function PasswordForgetLink() {
  return (
    <p>
      <Link to={Routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  );
}
