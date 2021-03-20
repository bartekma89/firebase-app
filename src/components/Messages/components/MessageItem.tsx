import { Message } from "../../../constants/types";

interface ComponentProps {
  message: Message;
}

export function MessageItem({ message }: ComponentProps) {
  return (
    <li>
      <strong>{message.userId}:</strong> {message.message}
    </li>
  );
}
