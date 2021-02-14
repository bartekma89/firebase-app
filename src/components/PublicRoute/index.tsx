import { ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";

import { RoutesType } from "../../constants/types";
import { useProvideAuthentication } from "../../services/hooks";

interface ComponentProps {
  children: ReactNode;
  redirection?: string;
  exact?: boolean;
  path: RoutesType;
  restricted?: boolean;
}

export function PublicRoute({
  children,
  redirection = "/home",
  restricted = false,
  ...rest
}: ComponentProps) {
  const { loadingAuthState, authenticated } = useProvideAuthentication();

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
        return authenticated && restricted ? (
          <Redirect
            to={{
              pathname: redirection,
              state: {
                from: location,
              },
            }}
          />
        ) : (
          children
        );
      }}
    />
  );
}
