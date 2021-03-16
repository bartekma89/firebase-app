import { useState } from "react";
import { Roles } from "../../../constants/roles";
import { Routes } from "../../../constants/routes";
import {
  useDbFirebase,
  useAuthContext,
  useRouter,
} from "../../../services/hooks";

export function SignInGoogle() {
  const [error, setError] = useState<string | null>();
  const { doSignInWithGoogle } = useAuthContext();
  const { history } = useRouter();
  const db = useDbFirebase();

  const handleSubmit = (e: any) => {
    doSignInWithGoogle!()
      .then((socialAuthUser) => {
        console.log(socialAuthUser);
        return db.user(socialAuthUser.user?.uid).set({
          username: socialAuthUser.user?.displayName,
          email: socialAuthUser.user?.email,
          role: Roles.USER,
        });
      })
      .then(() => {
        history.push(Routes.HOME);
      })
      .catch((error) => {
        setError(error);
      });

    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <div>{error}</div>}
    </form>
  );
}
