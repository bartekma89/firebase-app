import { useAuthContext } from "../../services/hooks/";
import { NavigationAuth, NavigationNonAuth } from "./components/";

export function Navigation() {
  const { user } = useAuthContext();

  return (
    <div>
      {user ? <NavigationAuth userRole={user.role} /> : <NavigationNonAuth />}
    </div>
  );
}
