import { useEffect, useState } from "react";
import { Roles } from "../../../constants/roles";
import { Routes } from "../../../constants/routes";
import { User } from "../../../constants/types";
import {
  useDbFirebase,
  useProvideAuth,
  useRouter,
  useAuthContext,
} from "../../../services/hooks";

interface RouteParams {
  id: string;
}

interface LocationParams {
  user: User;
}

export function UserItem() {
  const { query, history, location } = useRouter<RouteParams, LocationParams>();
  const { user, doPasswordReset } = useAuthContext();
  const db = useDbFirebase();

  const [userDetails, setUserDetails] = useState<User | null>(() =>
    location.state?.user ? location.state.user : null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onSendPasswordResetEmail = () => {
    doPasswordReset!(user!.email);
  };

  useEffect(() => {
    if (user) {
      return;
    }
    setLoading(true);
    db.user(query.id).on("value", (snapshots) => {
      setUserDetails({
        uid: query.id,
        ...snapshots.val(),
      });
      setLoading(false);
    });

    return () => db.user(query.id).off();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  useEffect(() => {
    if (user?.role !== Roles.ADMIN) {
      history.push(Routes.HOME);
    }
  }, [user?.role, history]);

  return (
    <div>
      <h2>User ({query.id})</h2>
      {loading && <div>loading...</div>}
      {userDetails && (
        <div>
          <span>
            <strong>ID: </strong>
            {userDetails.uid}
          </span>
          {" | "}
          <span>
            <strong>E-mail: </strong>
            {userDetails.email}
          </span>
          {" | "}
          <span>
            <strong>Username: </strong>
            {userDetails.username}
          </span>
          <div>
            <button type="button" onClick={onSendPasswordResetEmail}>
              Send reset password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
