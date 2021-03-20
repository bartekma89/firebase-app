import { useEffect, useState } from "react";

import { MessageList } from "./components";
import { useDbFirebase } from "../../services/hooks";
import { Message } from "../../constants/types";

export function Messages() {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[] | null>(null);

  const db = useDbFirebase();

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

  return (
    <div>
      {loading && <div>Loading...</div>}
      {messages ? (
        <MessageList messages={messages} />
      ) : (
        <div>There are no messages...</div>
      )}
    </div>
  );
}
