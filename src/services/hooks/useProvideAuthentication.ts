import { useState, useEffect } from "react";

import { firebase } from "../Firebase";

export function useProvideAuthentication() {
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
      });
  };

  const doPasswordReset = (email: string) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  const doPasswordUpdate = (email: string) => {
    return firebase.auth().currentUser?.updatePassword(email);
  };

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoadingAuthState(false);
    });

    return () => listener();
  }, []);

  return {
    user,
    loadingAuthState,
    authenticated: user !== null,
    doSignInWithEmailAndPassword,
    doSignUpWithEmailAndPassword,
    doSignOut,
    doPasswordReset,
    doPasswordUpdate,
  };
}
