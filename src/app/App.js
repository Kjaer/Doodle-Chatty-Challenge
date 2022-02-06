import { useState } from "react";

import { ChatForm } from "./components/ChatForm";
import { ChatHistory } from "./components/ChatHistory";

import * as styles from "./App.module.css";

export function App() {
  const [notification, setNotifier] = useState(true);

  return (
    <section className={styles.container}>
      <ChatHistory
        pullHistoryNotification={notification}
        pullHistoryNotifier={setNotifier}
      />

      <ChatForm messageSentNotifier={setNotifier} />
    </section>
  );
}
