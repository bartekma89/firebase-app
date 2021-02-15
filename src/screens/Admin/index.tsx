import { useState, useEffect } from "react";

import { useDbFirebase } from "../../services/hooks";
import { User } from "../../constants/types";
import { UserList } from "./components";

export function AdminPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | []>([]);

  const db = useDbFirebase();

  useEffect(() => {
    setLoading(true);

    db.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
      setLoading(false);
    });

    return () => db.users().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      {loading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
  );
}
