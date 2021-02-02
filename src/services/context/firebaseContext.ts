import { createContext } from "react";

import firebase from "firebase";

interface ContextProps {
  user: firebase.User;
  auth: firebase.auth.Auth;
}

export const FirebaseContext = createContext<Partial<ContextProps>>({});
