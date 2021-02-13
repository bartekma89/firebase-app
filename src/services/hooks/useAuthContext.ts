import { useContext } from "react";

import { AuthContext } from "../context";

export function useAuthContext() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Missing AuthContext data!");
  }
  return authContext;
}
