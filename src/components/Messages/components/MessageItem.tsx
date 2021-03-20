import { Message } from "../../../constants/types";

interface ComponentProps {
  message: Message;
  onRemoveMessage: (uid: string) => void;
}

export function MessageItem({ message, onRemoveMessage }: ComponentProps) {
  return (
    <li>
      <strong>{message.userId}:</strong> {message.message}
      <button type="button" onClick={() => onRemoveMessage(message.uid)}>
        Delete
      </button>
    </li>
  );
}
