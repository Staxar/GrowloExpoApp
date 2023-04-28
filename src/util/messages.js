import { getDatabase, push, ref, set } from "firebase/database";

const db = getDatabase();

async function getMessage() {}

export function sendMessage(params, message) {
  let timestamp = new Date().getTime();

  const MessageListRef = ref(db, "messages");
  const newMessageRef = push(MessageListRef);
  set(newMessageRef, {
    author: params.author,
    recipient: params.recipient,
    content: message,
    timestamp: timestamp,
  })
    .then(() => {
      console.log("Message saved successfully!");
    })
    .catch((e) => {
      console.error(e);
    });
}
