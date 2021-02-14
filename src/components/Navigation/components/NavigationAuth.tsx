import { Link } from "react-router-dom";

import { Routes } from "../../../constants/routes";
import { SignOutButton } from "../../SignOutButton";

export function NavigationAuth() {
  return (
    <ul>
      <li>
        <Link to={Routes.ADMIN}>Admin</Link>
      </li>
      <li>
        <Link to={Routes.HOME}>Home</Link>
      </li>
      <li>
        <Link to={Routes.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
}
