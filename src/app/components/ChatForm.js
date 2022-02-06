import { sendMessage } from "../../api/chatty";
import { useState } from "react";

export function ChatForm() {
  const [message, setMessage] = useState("");

  async function submitMessage(event) {
    event.preventDefault();

    if (!message) {
      return;
    }

    const payload = {
      message,
      author: "Test Sender",
    };

    await sendMessage(payload).catch((error) => {
      throw new Error(`Last message could not send. ${error.toString()}`);
    });
  }

  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  return (
    <footer>
      <form onSubmit={submitMessage}>
        <input
          type="text"
          onChange={messageChangeHandler}
          value={message}
          placeholder="Message"
        />
        <button type="submit">Send</button>
      </form>
    </footer>
  );
}
