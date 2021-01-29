import { Link } from "react-router-dom";

import { Routes } from "../../../constants/routes";

export default function SignUpLink() {
  return (
    <p>
      Don't have an account? <Link to={Routes.SIGN_UP}>Sign Up</Link>
    </p>
  );
}
