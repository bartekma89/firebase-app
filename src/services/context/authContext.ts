import { createContext } from "react";
import { firebase } from "../Firebase";

import { User } from "../../constants/types";

interface ContextProps {
  user: User | null;
  authenticated: boolean;
  loadingAuthState: boolean;
  doSignInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<firebase.User | null>;
  doSignUpWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<firebase.User | null>;
  doSignOut: () => Promise<void>;
  doPasswordReset: (email: string) => Promise<void>;
  doPasswordUpdate: (email: string) => Promise<void> | undefined;
}

export const AuthContext = createContext<Partial<ContextProps>>({});
