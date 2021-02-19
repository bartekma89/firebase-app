import { Link } from "react-router-dom";
import { Roles } from "../../../constants/roles";

import { Routes } from "../../../constants/routes";
import { RolesTypes } from "../../../constants/types";
import { SignOutButton } from "../../SignOutButton";

interface ComponentProps {
  userRole: RolesTypes;
}

export function NavigationAuth({ userRole }: ComponentProps) {
  return (
    <ul>
      <li>
        <Link to={Routes.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={Routes.HOME}>Home</Link>
      </li>
      <li>
        <Link to={Routes.ACCOUNT}>Account</Link>
      </li>
      {userRole === Roles.ADMIN && (
        <li>
          <Link to={Routes.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
}
