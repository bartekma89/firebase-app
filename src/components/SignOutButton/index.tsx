import { useAuthContext } from "../../services/hooks";

export function SignOutButton() {
  const authContext = useAuthContext();

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
