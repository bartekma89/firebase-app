import { firebase } from "../Firebase";

export function useDbFirebase() {
  const user = (uid: string) => firebase.database().ref(`users/${uid}`);

  const users = () => firebase.database().ref("users");

  return {
    user,
    users,
  };
}
