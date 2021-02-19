import { ReactNode } from "react";

import { useProvideAuth } from "../../services/hooks";
import { AuthContext } from "../../services/context";

interface ComponentProps {
  children: ReactNode;
}

export function ProvideAuth({ children }: ComponentProps) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
