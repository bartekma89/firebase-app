import firebase from "firebase";
import { User } from "../../constants/types";
import { useProvideAuth } from "../../services/hooks";

const needsEmailVerification = (authUser: User | null) =>
  !authUser?.emailVerified &&
  authUser?.providerData
    .map((provider: firebase.auth.AuthProvider) => provider.providerId)
    .includes("password");

export function VerificationEmail() {
  const { user, doSendEmailVarification } = useProvideAuth();

  return needsEmailVerification(user) ? (
    <div>
      <p>Verify your E-mail:</p>
    </div>
  ) : null;
}
