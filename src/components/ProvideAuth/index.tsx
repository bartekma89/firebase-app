import { ReactNode } from "react";

import { useProvideAuth, AuthContext } from "../../services/hooks";

interface ComponentProps {
  children: ReactNode;
}

export function ProvideAuth({ children }: ComponentProps) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
