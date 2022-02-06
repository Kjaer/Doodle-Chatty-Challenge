import { sendMessage } from "../../../api/chatty";
import { useState } from "react";

import * as styles from "./ChatForm.module.css";

export function ChatForm(props) {
  const { messageSentNotifier, sender: author } = props;
  const [message, setMessage] = useState("");

  async function submitMessage(event) {
    event.preventDefault();

    if (!message) {
      return;
    }

    const payload = {
      message,
      author,
    };

    await sendMessage(payload).catch((error) => {
      throw new Error(`Last message could not send. ${error.toString()}`);
    });

    messageSentNotifier(true);
  }

  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  return (
    <footer className={styles.chatFormWrapper}>
      <form onSubmit={submitMessage} className={styles.chatForm}>
        <input
          type="text"
          onChange={messageChangeHandler}
          value={message}
          placeholder="Message"
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </footer>
  );
}
