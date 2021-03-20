import { useEffect, useState, useCallback } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import { MessageList } from "./components";
import { useDbFirebase, useAuthContext } from "../../services/hooks";
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

  const db = useDbFirebase();
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);

    db.messages().on("value", (snapshot) => {
      const messagesObject = snapshot.val();
      if (messagesObject) {
        const messagesList = Object.keys(messagesObject).map((key: string) => ({
          ...messagesObject[key],
          uid: key,
        }));
        setMessages(messagesList);

        setLoading(false);
      } else {
        setMessages(null);
        setLoading(false);
      }
    });

    return () => db.messages().off();
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
        message: values.text,
        userId: authUser.uid,
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

  return (
    <div>
      {loading && <div>Loading...</div>}
      {messages ? (
        <MessageList
          messages={messages}
          onRemoveMessage={handleRemoveMessage}
        />
      ) : (
        <div>There are no messages...</div>
      )}
      <br />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="text">Message: </label>
          <input
            id="message"
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
