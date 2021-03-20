import { Message } from "../../../constants/types";
import { MessageItem } from "./";

interface ComponetProps {
  messages: Message[];
  onRemoveMessage: (uid: string) => void;
}

export function MessageList({ messages, onRemoveMessage }: ComponetProps) {
  return (
    <ul>
      {messages.map((message) => (
        <MessageItem
          key={message.uid}
          message={message}
          onRemoveMessage={onRemoveMessage}
        />
      ))}
    </ul>
  );
}
