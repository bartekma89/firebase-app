import { useAuthContext } from "../../services/hooks";
import { Messages } from "../../components";

export function HomePage() {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Home</h1>
      <p>You're logged in with React</p>
      {user?.role && (
        <p>
          Your role is: <strong>{user?.role}</strong>.
        </p>
      )}
      <p>This page can be accessed by all authenticated users.</p>
      <div>
        Current user:
        {user && (
          <ul>
            <li>{user.username}</li>
          </ul>
        )}
      </div>
      <Messages />
    </div>
  );
}
