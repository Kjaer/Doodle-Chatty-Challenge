import { useState } from "react";

import { ChatForm } from "./components/ChatForm";
import { ChatHistory } from "./components/chat-history/ChatHistory";

import * as styles from "./App.module.css";

export function App() {
  const [notification, setNotifier] = useState(true);

  return (
    <div className={styles.patternBg}>
      <ChatHistory
        pullHistoryNotification={notification}
        pullHistoryNotifier={setNotifier}
      />

      <ChatForm messageSentNotifier={setNotifier} />
    </div>
  );
}
