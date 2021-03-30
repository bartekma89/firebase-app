import { Message, User } from "../../../constants/types";
import { MessageItem } from "./";

interface ComponetProps {
  users: User[] | null;
  messages: Message[];
  onRemoveMessage: (uid: string) => void;
  onEditMessage: (message: Message, editText: string) => void;
}

export function MessageList({
  users,
  messages,
  onRemoveMessage,
  onEditMessage,
}: ComponetProps) {
  return (
    <ul>
      {messages.map((message) => {
        return (
          <MessageItem
            key={message.uid}
            message={message}
            user={users?.find((user) => user.uid === message.userId)}
            onRemoveMessage={onRemoveMessage}
            onEditMessage={onEditMessage}
          />
        );
      })}
    </ul>
  );
}
