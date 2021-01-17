import { createContext } from "react";

import firebase from "firebase";

type ContextProps = {
  user: firebase.User | null;
};

export const FirebaseContext = createContext<Partial<ContextProps>>({});
