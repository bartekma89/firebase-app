import { useState } from "react";
import { Routes } from "../../../constants/routes";
import {
  useDbFirebase,
  useProvideAuth,
  useRouter,
} from "../../../services/hooks";

export function SignInGoogle() {
  const [error, setError] = useState<string | null>();
  const { doSignInWithGoogle } = useProvideAuth();
  const { history } = useRouter();
  const db = useDbFirebase();

  const handleSubmit = (e: any) => {
    doSignInWithGoogle()
      .then((socialAuthUser) => {
        console.log(socialAuthUser);
        return db.user(socialAuthUser.user?.uid).set({
          username: socialAuthUser.user?.displayName,
          email: socialAuthUser.user?.email,
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
