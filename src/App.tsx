import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Navigation, PrivateRoute, PublicRoute } from "./components/";
import { Routes } from "./constants/routes";
import {
  AccountPage,
  LandingPage,
  SignInPage,
  SignUpPage,
  PasswordForgetPage,
  HomePage,
  AdminPage,
  NoMatchPage,
} from "./screens/";

export function App() {
  return (
    <Router>
      <Navigation />
      <hr />
      <Switch>
        <PublicRoute exact path={Routes.LANDING}>
          <LandingPage />
        </PublicRoute>
        <PublicRoute restricted path={Routes.SIGN_IN}>
          <SignInPage />
        </PublicRoute>
        <PublicRoute restricted path={Routes.SIGN_UP}>
          <SignUpPage />
        </PublicRoute>
        <PublicRoute restricted path={Routes.PASSWORD_FORGET}>
          <PasswordForgetPage />
        </PublicRoute>
        <PrivateRoute path={Routes.HOME}>
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path={Routes.ACCOUNT}>
          <AccountPage />
        </PrivateRoute>
        <PrivateRoute path={Routes.ADMIN}>
          <AdminPage />
        </PrivateRoute>
        <PublicRoute path={Routes.NO_MATCH}>
          <NoMatchPage />
        </PublicRoute>
      </Switch>
    </Router>
  );
}
