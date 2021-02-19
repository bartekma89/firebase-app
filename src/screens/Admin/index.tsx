import { useEffect, useReducer, Reducer } from "react";

import { useDbFirebase, useProvideAuth, useRouter } from "../../services/hooks";
import { User } from "../../constants/types";
import { UserList } from "./components";
import { Roles } from "../../constants/roles";
import { Routes } from "../../constants/routes";

type StatusTypes = "idle" | "pending" | "resolved";
type ActionTypes =
  | {
      type: "success";
      users: User[] | [];
    }
  | {
      type: "started";
    };

interface State {
  status: StatusTypes;
  users: User[] | [];
}

const initialState: State = {
  status: "idle",
  users: [],
};

const usersReducer: Reducer<State, ActionTypes> = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        ...state,
        status: "resolved",
        users: action.users,
      };
    case "started":
      return {
        ...state,
        status: "pending",
      };
    default: {
      throw new Error("Unhandled action type");
    }
  }
};

export function AdminPage() {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { user } = useProvideAuth();
  const db = useDbFirebase();
  const { history } = useRouter();

  const isLoading = state.status === "idle" || state.status === "pending";
  const isResolved = state.status === "resolved";

  useEffect(() => {
    dispatch({ type: "started" });
    db.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      dispatch({
        type: "success",
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
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      {isLoading && <div>Loading ...</div>}
      {isResolved && <UserList users={state.users} />}
    </div>
  );
}
