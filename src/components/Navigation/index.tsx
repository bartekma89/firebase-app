import { Link } from "react-router-dom";

import { SignOutButton } from "../SignOutButton";
import { Routes } from "../../constants/routes";

import { useAuthContext } from "../../services/hooks/";

export function Navigation() {
  const { user } = useAuthContext();

  return <div>{user ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
}

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={Routes.SIGN_IN}>Sign In</Link>
    </li>

    <li>
      <Link to={Routes.LANDING}>Landing</Link>
    </li>
  </ul>
);

const NavigationAuth = () => (
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
