import { useState, useEffect } from "react";
import { getAllMessages } from "../../../api/chatty";
import { unescape } from "he";

import * as styles from "./ChatHistory.module.css";

export function ChatHistory(props) {
  const { pullHistoryNotification, pullHistoryNotifier, messageSender } = props;
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
    <section className={styles.chatHistory}>
      <div>
        {chatList.map((chat) => (
          <div
            key={chat._id}
            className={`${styles.chatBubbleWrapper} ${
              messageSender === chat.author
                ? styles.myMessage
                : styles.theirMessage
            }`}
          >
            <article className={styles.chatBubble}>
              <h6 className={styles.sender}>{chat.author}</h6>
              <p className={styles.message}>{unescape(chat.message)}</p>
              <time
                dateTime={new Date(chat.timestamp).toISOString()}
                className={styles.timestamp}
              >
                {new Date(chat.timestamp).toLocaleString(
                  Intl.DateTimeFormat().resolvedOptions().locale,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </time>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
