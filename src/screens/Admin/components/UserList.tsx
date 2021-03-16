import { Reducer, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

import { Roles } from "../../../constants/roles";
import { Routes } from "../../../constants/routes";
import { User } from "../../../constants/types";
import {
  useDbFirebase,
  useProvideAuth,
  useRouter,
} from "../../../services/hooks";

enum Statuses {
  IDLE = "idle",
  PENDING = "pending",
  RESOLVED = "resolved",
}

enum ActionStatuses {
  SUCCESS = "success",
  STARTED = "started",
}

type ActionTypes =
  | {
      type: ActionStatuses.SUCCESS;
      users: User[] | [];
    }
  | {
      type: ActionStatuses.STARTED;
    };

type StatusTypes = Statuses.IDLE | Statuses.PENDING | Statuses.RESOLVED;

interface State {
  status: StatusTypes;
  users: User[];
}

const initialState: State = {
  status: Statuses.IDLE,
  users: [],
};

const usersReducer: Reducer<State, ActionTypes> = (state, action) => {
  switch (action.type) {
    case ActionStatuses.SUCCESS:
      return {
        ...state,
        status: Statuses.RESOLVED,
        users: action.users,
      };
    case ActionStatuses.STARTED:
      return {
        ...state,
        status: Statuses.PENDING,
      };
    default: {
      throw new Error("Unhandled action type");
    }
  }
};

export function UserList() {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { user } = useProvideAuth();
  const db = useDbFirebase();
  const { history } = useRouter();

  const { status, users } = state;

  const isLoading = status === Statuses.IDLE || status === Statuses.PENDING;
  const isResolved = status === Statuses.RESOLVED;

  useEffect(() => {
    dispatch({
      type: ActionStatuses.STARTED,
    });
    db.users().on("value", (snapshots) => {
      const usersObject = snapshots.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      dispatch({
        type: ActionStatuses.SUCCESS,
        users: usersList,
      });
    });

    return () => db.users().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.role !== Roles.ADMIN) {
      history.push(Routes.HOME);
    }
  }, [user?.role, history]);

  return (
    <div>
      <h2>Users</h2>
      {isLoading && <div>Loading...</div>}
      {isResolved && (
        <ul>
          {users.map((user: User) => {
            return (
              <li key={user.uid}>
                <span>
                  <strong>ID: </strong>
                  {user.uid}
                </span>
                {" | "}
                <span>
                  <strong>Email: </strong>
                  {user.email}
                </span>
                {" | "}
                <span>
                  <strong>Username: </strong>
                  {user.username}
                </span>
                {" | "}
                <span>
                  <Link
                    to={{
                      pathname: `${Routes.ADMIN}/${user.uid}`,
                      state: { user },
                    }}
                  >
                    Details
                  </Link>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
