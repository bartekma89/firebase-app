import { Link } from "react-router-dom";

import { Routes } from "../../constants/routes";

export function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to={Routes.SIGN_IN}>Sign In</Link>
        </li>
        <li>
          <Link to={Routes.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={Routes.HOME}>Home</Link>
        </li>
        <li>
          <Link to={Routes.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={Routes.ADMIN}>Admin</Link>
        </li>
      </ul>
    </div>
  );
}
