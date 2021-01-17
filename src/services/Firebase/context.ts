import { createContext } from "react";

import firebase from "firebase";

interface ContextProps {
  user: firebase.User | null;
  auth: firebase.auth.Auth;
}

export const FirebaseContext = createContext<Partial<ContextProps>>({});
