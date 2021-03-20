import { Message } from "../../../constants/types";

interface ComponentProps {
  message: Pick<Message, "text">;
}

export function MessageItem({ message }: ComponentProps) {
  return <li>{message}</li>;
}
