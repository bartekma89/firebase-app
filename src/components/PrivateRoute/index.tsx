import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthenticationContext } from "../../services/hooks/";
import { RoutesType } from "../../constants/types";

interface ComponentProps {
  children: React.ReactNode;
  redirection?: string;
  exact?: boolean;
  path: RoutesType;
}

export function PrivateRoute({
  children,
  redirection = "/signin",
  ...rest
}: ComponentProps) {
  const { loadingAuthState, authenticated } = useAuthenticationContext();

  if (loadingAuthState) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirection,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
