import { useAuthenticationContext } from "../../services/hooks";

export function SignOutButton() {
  const authContext = useAuthenticationContext();

  return (
    <button
      type="button"
      onClick={() => {
        authContext.doSignOut!();
      }}
    >
      Sin Out
    </button>
  );
}
