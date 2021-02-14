import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Routes } from "./constants/routes";
import { AccountPage } from "./screens/Account";
import { LandingPage } from "./screens/Landing";
import { SignInPage } from "./screens/SignIn";
import { SignUpPage } from "./screens/SignUp";
import { PasswordForgetPage } from "./screens/PasswordForget";
import { HomePage } from "./screens/Home";
import { AdminPage } from "./screens/Admin";
import { NoMatchPage } from "./screens/NoMatch";

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
