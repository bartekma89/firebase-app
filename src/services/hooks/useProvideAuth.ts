import { useState, useEffect } from "react";
import { User } from "../../constants/types";

import { firebase } from "../Firebase";
import { useDbFirebase } from "./useDbFirebase";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export function useProvideAuth() {
  const [user, setUser] = useState<User | null>(() => {
    return localStorage.getItem("authUser") === null
      ? null
      : JSON.parse(localStorage.getItem("authUser") as string);
  });
  const [loadingAuthState, setLoadingAuthState] = useState<boolean>(true);
  const dbUser = useDbFirebase();

  const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        return response.user;
      });
  };

  const doSignUpWithEmailAndPassword = (email: string, password: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        return response.user;
      });
  };

  const doSignInWithGoogle = () => {
    return firebase.auth().signInWithPopup(googleProvider);
  };

  const doSendEmailVarification = () => {
    return firebase.auth().currentUser?.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT as string,
    });
  };

  const doSignOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.removeItem("authUser");
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
      if (user) {
        let authUser = null;

        dbUser
          .user(user.uid)
          .once("value")
          .then((snapshot) => {
            authUser = {
              uid: user.uid,
              // emailVerified: user.emailVerified,
              // providerData: user.providerData,
              ...snapshot.val(),
            };

            localStorage.setItem("authUser", JSON.stringify(authUser));
            setUser(authUser);
          });
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
      setLoadingAuthState(false);
    });

    return () => listener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    doSignInWithGoogle,
    doSendEmailVarification,
  };
}
