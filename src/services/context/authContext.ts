import { createContext } from "react";
import firebase from "firebase";

type User = firebase.User | null;

interface ContextProps {
  user: User;
  authenticated: boolean;
  setUser: (user: User) => void;
  loadingAuthState: boolean;
}

export const AuthContext = createContext<Partial<ContextProps>>({});
