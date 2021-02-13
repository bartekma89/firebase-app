import { ReactNode } from "react";

import { useProvideAuthentication } from "../../services/hooks";
import { AuthContext } from "../../services/context";

interface ComponentProps {
  children: ReactNode;
}

export function ProvideAuthorization({ children }: ComponentProps) {
  const auth = useProvideAuthentication();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
