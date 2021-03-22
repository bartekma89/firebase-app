import { firebase } from "../Firebase";

const db = firebase.database();

export function useDbFirebase() {
  const user = (uid: string | undefined) => db.ref(`users/${uid}`);
  const users = () => db.ref("users");

  const message = (uid: string) => db.ref(`messages/${uid}`);
  const messages = () => db.ref("messages");

  const serverValue = firebase.database.ServerValue;

  return {
    user,
    users,
    message,
    messages,
    serverValue,
  };
}
