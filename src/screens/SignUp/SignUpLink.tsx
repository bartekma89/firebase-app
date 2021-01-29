import { Link } from "react-router-dom";

import { Routes } from "../../constants/routes";

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={Routes.SIGN_UP}>Sign Up</Link>
  </p>
);
