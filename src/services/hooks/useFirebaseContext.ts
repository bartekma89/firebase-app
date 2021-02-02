import { useContext } from "react";

import { FirebaseContext } from "../context";

export const useFirebaseContext = () => {
  const firebaseContext = useContext(FirebaseContext);
  if (!firebaseContext) {
    throw new Error("Missing FirebaseContext data!");
  }

  return firebaseContext;
};
