import { ReactElement } from "react";

import { useProvideAuth, AuthContext } from "../../services/hooks";

interface ComponentProps {
  children: ReactElement;
}

export function ProvideAuth({ children }: ComponentProps) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
