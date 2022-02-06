const API = "https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/";
const API_KEY = "1L4fhQILRGFW";

export async function getAllMessages() {
  const request = await fetch(`${API}?token=${API_KEY}`);
  const messages = await request.json();

  return messages;
}

export async function sendMessage(payload) {
  const request = await fetch(`${API}`, {
    method: "POST",
    headers: {
      token: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const message = request.json();

  return message;
}
