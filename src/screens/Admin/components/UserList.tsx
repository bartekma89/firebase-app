import { User } from "../../../constants/types";

interface ComponentProps {
  users: User[];
}

export function UserList({ users }: ComponentProps) {
  return (
    <ul>
      {users.map((user: User) => {
        return (
          <li key={user.uid}>
            <span>
              <strong>ID: </strong>
              {user.uid}
              {" | "}
            </span>
            <span>
              <strong>Email: </strong>
              {user.email}
              {" | "}
            </span>
            <span>
              <strong>Username: </strong>
              {user.username}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
