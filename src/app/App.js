import { ChatForm } from "./components/ChatForm";
import { ChatHistory } from "./components/ChatHistory";

import * as styles from "./App.module.css";

export function App() {
  return (
    <section className={styles.container}>
      <ChatHistory />
      <ChatForm />
    </section>
  );
}
