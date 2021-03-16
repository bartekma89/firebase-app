import { Switch, Route } from "react-router-dom";

import { UserItem, UserList } from "./components";
import { Routes } from "../../constants/routes";

export function AdminPage() {
  return (
    <div>
      <h1>Admin</h1>
      <p>The Admin page is accessible by every singed by admin user</p>

      <Switch>
        <Route exact path={Routes.ADMIN_DETAILS}>
          <UserItem />
        </Route>
        <Route exact path={Routes.ADMIN}>
          <UserList />
        </Route>
      </Switch>
    </div>
  );
}
