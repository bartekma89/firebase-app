import { useAuthenticationContext } from "../../services/hooks/";
import { NavigationAuth, NavigationNonAuth } from "./components/";

export function Navigation() {
  const { user } = useAuthenticationContext();

  return <div>{user ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
}
