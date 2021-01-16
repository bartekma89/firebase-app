import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Navigation } from "../../components/Navigation";
import { Routes } from "../../constants/routes";
import { AccountPage } from "../Account";
import React from "react";
import { LandingPage } from "../Landing";
import { SignInPage } from "../SignIn";
import { SignUpPage } from "../SignUp";
import { PasswordForgetPage } from "../PasswordForget";
import { HomePage } from "../Home";
import { AdminPage } from "../Admin";
import { NoMatchPage } from "../NoMatch";

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
