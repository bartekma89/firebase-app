import { createContext } from "react";
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
  doPasswordReset: (email: string) => Promise<void>;
  doPasswordUpdate: (email: string) => Promise<void> | undefined;
}

export const AuthContext = createContext<Partial<ContextProps>>({});
