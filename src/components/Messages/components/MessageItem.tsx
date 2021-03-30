import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Message, User } from "../../../constants/types";
import { useAuthContext } from "../../../services/hooks";

interface ComponentProps {
  user: User | undefined;
  message: Message;
  onRemoveMessage: (uid: string) => void;
  onEditMessage: (message: Message, editText: string) => void;
}

interface Values {
  messageText: string | undefined;
}

const initialValues = (initialText: string) => ({
  messageText: initialText,
});

const validationSchema: yup.SchemaOf<Values> = yup.object().shape({
  messageText: yup.string().notRequired(),
});

export function MessageItem({
  user,
  message,
  onRemoveMessage,
  onEditMessage,
}: ComponentProps) {
  const { user: authUser } = useAuthContext();

  const { messageText, uid } = message;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(messageText);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setEditText(messageText);
  };

  const handleSaveEditText = (values: Values) => {
    onEditMessage(message, values.messageText!);

    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: initialValues(messageText),
    validationSchema,
    onSubmit: handleSaveEditText,
  });

  return (
    <li>
      {editMode ? (
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            value={formik.values.messageText}
            name="messageText"
            onChange={formik.handleChange}
          />
          {authUser?.uid === message.userId && (
            <span>
              {editText && (
                <span>
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleToggleEditMode}>
                    Reset
                  </button>
                </span>
              )}
            </span>
          )}
        </form>
      ) : (
        <span>
          <strong>{user?.username}:</strong> {messageText}{" "}
          {message?.editedAt && <span>Edited</span>}
        </span>
      )}
      {authUser?.uid === message.userId && (
        <span>
          {!editMode && (
            <span>
              <button type="button" onClick={handleToggleEditMode}>
                Edit
              </button>
              <button type="button" onClick={() => onRemoveMessage(uid)}>
                Delete
              </button>
            </span>
          )}
        </span>
      )}
    </li>
  );
}
