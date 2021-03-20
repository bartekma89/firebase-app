import { Message } from "../../../constants/types";
import { MessageItem } from "./";

interface ComponetProps {
  messages: Message[];
}

export function MessageList({ messages }: ComponetProps) {
  return (
    <ul>
      {messages.map((message) => (
        <MessageItem key={message.uid} message={message} />
      ))}
    </ul>
  );
}
