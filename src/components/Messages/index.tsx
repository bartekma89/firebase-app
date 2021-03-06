import { useEffect, useState, useCallback } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import { MessageList } from "./components";
import {
  useDbFirebase,
  useAuthContext,
  useAsyncState,
} from "../../services/hooks";
import { Message, User } from "../../constants/types";

interface Values {
  text: string | undefined;
}

const initialValues: Values = {
  text: "",
};

const validationSchema: yup.SchemaOf<Values> = yup.object().shape({
  text: yup.string().notRequired(),
});

export function Messages() {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [limit, setLimit] = useAsyncState<number>(3);
  const [users, setUsers] = useState<User[] | null>(null);

  const db = useDbFirebase();
  const { user } = useAuthContext();

  const onListenForMessage = (limit: number) => {
    setLoading(true);

    db.messages()
      .orderByChild("createdAt")
      .limitToLast(limit)
      .on("value", (snapshot) => {
        const messagesObject = snapshot.val();
        if (messagesObject) {
          const messagesList = Object.keys(messagesObject)
            .map((key: string) => ({
              ...messagesObject[key],
              uid: key,
            }))
            .reverse();
          setMessages(messagesList);

          setLoading(false);
        } else {
          setMessages(null);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    onListenForMessage(limit);

    return () => db.messages().off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    db.users().once("value", (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
    });

    return () => {
      db.users().off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => handleCreateMessage(values, actions, user!),
  });

  function handleCreateMessage(
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>,
    authUser: User
  ) {
    db.messages()
      .push({
        messageText: values.text,
        userId: authUser.uid,
        createdAt: db.serverValue.TIMESTAMP,
      })
      .then(() => {
        resetForm();
        setSubmitting(false);
      });
  }

  const handleRemoveMessage = useCallback(
    (uid: string) => db.message(uid).remove(),
    [db]
  );

  const handleEditMessage = useCallback(
    (message: Message, editedText: string) => {
      const { uid, ...messageSnapshot } = message;
      db.message(uid).set({
        ...messageSnapshot,
        messageText: editedText,
        editedAt: db.serverValue.TIMESTAMP,
      });
    },
    [db]
  );

  const handleNextPage = () => {
    setLimit(limit + 3).then((value) => {
      onListenForMessage(value);
    });
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && messages && <button onClick={handleNextPage}>More</button>}
      {messages ? (
        <MessageList
          users={users}
          messages={messages}
          onRemoveMessage={handleRemoveMessage}
          onEditMessage={handleEditMessage}
        />
      ) : (
        <div>There are no messages...</div>
      )}
      <br />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="text">Message: </label>
          <input
            id="text"
            type="text"
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
          />
          <button type="submit" disabled={formik.isSubmitting}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
