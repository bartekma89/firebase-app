import { Link } from "react-router-dom";

import { Routes } from "../../../constants/routes";

export function NavigationNonAuth() {
  return (
    <ul>
      <li>
        <Link to={Routes.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={Routes.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={Routes.SIGN_UP}>Sign Up</Link>
      </li>
    </ul>
  );
}
