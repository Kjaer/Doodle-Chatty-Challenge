import { useState, useEffect } from "react";

import { ChatForm } from "./components/chat-form/ChatForm";
import { ChatHistory } from "./components/chat-history/ChatHistory";

import * as styles from "./App.module.css";

export function App() {
  const [notification, setNotifier] = useState(true);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (author) {
      return;
    }

    const authorName = window.prompt("Who's messaging?");
    setAuthor(authorName);
  }, [author]);
  return (
    <div className={styles.patternBg}>
      <ChatHistory
        pullHistoryNotification={notification}
        pullHistoryNotifier={setNotifier}
        messageSender={author}
      />

      <ChatForm messageSentNotifier={setNotifier} sender={author} />
    </div>
  );
}
