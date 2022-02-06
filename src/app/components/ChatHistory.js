import { useState, useEffect } from "react";
import { getAllMessages } from "../../api/chatty";
import { unescape } from "he";

export function ChatHistory(props) {
  const { pullHistoryNotification, pullHistoryNotifier } = props;
  const [chatList, setChatList] = useState(null);
  const [intervalHandle, setIntervalHandler] = useState(0);

  useEffect(() => {
    async function fetchMessages() {
      const chatMessages = await getAllMessages();
      setChatList(chatMessages);
    }

    if (pullHistoryNotification) {
      fetchMessages();

      clearInterval(intervalHandle);

      const intervalId = setInterval(fetchMessages, 5000);

      setIntervalHandler(intervalId);
      pullHistoryNotifier(false);
    }
  }, [pullHistoryNotification]);

  if (!chatList) {
    return <h1>Chat history loading...</h1>;
  }

  return (
    <div>
      {chatList.map((chat) => (
        <article key={chat._id}>
          <h6>{chat.author}</h6>
          <p>{unescape(chat.message)}</p>
          <time dateTime={new Date(chat.timestamp).toISOString()}>
            {new Date(chat.timestamp).toLocaleString(
              Intl.DateTimeFormat().resolvedOptions().locale,
              { hour: "2-digit", minute: "2-digit" }
            )}
          </time>
        </article>
      ))}
    </div>
  );
}
