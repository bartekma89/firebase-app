import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navigation } from "./components/Navigation";
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
        <Route exact path={Routes.LANDING}>
          <LandingPage />
        </Route>
        <Route path={Routes.SIGN_IN}>
          <SignInPage />
        </Route>
        <Route path={Routes.SIGN_UP}>
          <SignUpPage />
        </Route>
        <Route path={Routes.PASSWORD_FORGET}>
          <PasswordForgetPage />
        </Route>
        <Route path={Routes.HOME}>
          <HomePage />
        </Route>
        <Route path={Routes.ACCOUNT}>
          <AccountPage />
        </Route>
        <Route path={Routes.ADMIN}>
          <AdminPage />
        </Route>
        <Route path={Routes.NO_MATCH}>
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}
