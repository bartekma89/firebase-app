import { Routes } from "./routes";

// enums

export type RoutesType =
  | Routes.ACCOUNT
  | Routes.ADMIN
  | Routes.HOME
  | Routes.LANDING
  | Routes.NO_MATCH
  | Routes.PASSWORD_FORGET
  | Routes.SIGN_IN
  | Routes.SIGN_UP;

// interfaces
export interface User {
  username: string;
  email: string;
  uid: string;
}
