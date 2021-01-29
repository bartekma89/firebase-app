import { useFirebaseContext } from "../../services/hooks";

export function SignOutButton() {
  const firebaseContext = useFirebaseContext();

  return (
    <button type="button" onClick={firebaseContext.auth?.signOut}>
      Sin Out
    </button>
  );
}
