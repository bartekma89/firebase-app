import { useContext, createContext } from "react";
import { firebase } from "../Firebase";

type User = firebase.User | null;

interface ContextProps {
  user: User;
  authenticated: boolean;
  setUser: (user: User) => void;
  loadingAuthState: boolean;
  doSignInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User>;
  doSignUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User>;
  doSignOut: () => Promise<void>;
}

export const AuthContext = createContext<Partial<ContextProps>>({});

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Missing AuthContext data!");
  }
  return authContext;
};
