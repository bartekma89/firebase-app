import { Roles } from "./roles";
import { Routes } from "./routes";

// types
export type RoutesTypes =
  | Routes.ACCOUNT
  | Routes.ADMIN
  | Routes.HOME
  | Routes.LANDING
  | Routes.NO_MATCH
  | Routes.PASSWORD_FORGET
  | Routes.SIGN_IN
  | Routes.SIGN_UP;

export type RolesTypes = Roles.ADMIN | Roles.USER;

// interfaces
export interface User {
  username: string;
  email: string;
  uid: string;
  role: RolesTypes;
  emailVerified: boolean;
  providerData: any;
}
