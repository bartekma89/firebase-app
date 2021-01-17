import { useContext } from "react";

import { FirebaseContext } from "../Firebase";

export const useFirebaseContext = () => {
  const firebaseContext = useContext(FirebaseContext);
  if (!firebaseContext) {
    throw new Error("Missing FirebaseContext data!");
  }

  return firebaseContext;
};
