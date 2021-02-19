import { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthContext } from "../../services/hooks/";
import { RoutesTypes } from "../../constants/types";

interface ComponentProps {
  children: ReactNode;
  redirection?: string;
  exact?: boolean;
  path: RoutesTypes;
}

export function PrivateRoute({
  children,
  redirection = "/signin",
  ...rest
}: ComponentProps) {
  const { loadingAuthState, authenticated } = useAuthContext();

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
