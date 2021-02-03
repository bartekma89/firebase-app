import { useState, useEffect } from "react";

import { firebase } from "../Firebase";

export function useProvideAuth() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loadingAuthState, setLoadingAuthState] = useState<boolean>(true);

  const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const doSignUpWithEmailAndPassword = (email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const doSignOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setLoadingAuthState(false);
      });
  };

  return {
    user,
    loadingAuthState,
    doSignInWithEmailAndPassword,
    doSignUpWithEmailAndPassword,
    doSignOut,
  };
}
