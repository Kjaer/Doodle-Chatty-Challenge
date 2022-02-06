import { useState, useEffect } from "react";
import { getAllMessages, sendMessage } from "../api/chatty";

export function App() {
  const [chatList, setChatList] = useState(null);
  const [message, setMessage] = useState("");


  useEffect(()=>{
    async function fetchMessages() {
      const chatMessages = await getAllMessages();
      setChatList(chatMessages);
    }

    fetchMessages();
  }, []);

  async function submitMessage(event) {
    event.preventDefault();

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


  if (!chatList) {
    return <h1>Chat history loading...</h1>;
  }

  return(
    <section>
      {chatList.map((chat) => (
        <article key={chat._id}>
          <h6>{chat.author}</h6>
          <p>{chat.message}</p>
          <time dateTime={new Date(chat.timestamp).toISOString()}>
            {new Date(chat.timestamp).toLocaleString(
              Intl.DateTimeFormat().resolvedOptions().locale,
              { hour: "2-digit", minute: "2-digit" }
            )}
          </time>
        </article>
      ))}

      <footer>
        <form onSubmit={submitMessage}>
          <input type="text" onChange={messageChangeHandler} value={message} />
          <button type="submit"> Send </button>
        </form>
      </footer>
    </section>
  )
}