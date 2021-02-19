import { useState, useEffect } from "react";
import { User } from "../../constants/types";

import { firebase } from "../Firebase";
import { useDbFirebase } from "./useDbFirebase";

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
              ...snapshot.val(),
              uid: user.uid,
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
