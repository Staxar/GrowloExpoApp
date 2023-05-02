import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

const db = getDatabase();

async function getGroupMessage(params) {
  let result;
  console.log("getGroupMessage", params);
  const messageRef = ref(db, "messages");
  onValue(messageRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      if (
        (childData.author === params.author &&
          childData.recipient === params.recipient) ||
        (childData.author === params.recipient &&
          childData.recipient === params.author)
      ) {
        result = childKey;
        return result;
      } else {
        result = false;
        return result;
      }
    });
  });

  return result;
}

export async function sendMessage(params, message, groupId) {
  console.log("sendMessage: ", params, message, groupId);
  let timestamp = new Date().getTime();

  const MessageListRef = ref(db, `messages/${groupId}/message`);
  const newMessageRef = push(MessageListRef);
  set(newMessageRef, {
    author: params.author,
    content: message,
    timestamp: timestamp,
  }).catch((e) => {
    console.error(e);
  });
}

export async function createGroupMessage(params) {
  console.log("createGroupMessage: ", params);
  let timestamp = new Date().getTime();
  const MessageListRef = ref(db, `messages/`);
  const newMessageRef = push(MessageListRef);
  set(newMessageRef, {
    author: params.author,
    recipient: params.recipient,
    timestamp: timestamp,
  })
    .then(() => {
      getGroupMessage(params, message);
      return;
    })
    .catch((e) => {
      console.error(e);
    });
  return;
}
export async function getMessages(params) {
  console.log("getMessages", params);
  let result;
  const messageRef = ref(db, "messages");
  onValue(messageRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      if (
        (childData.author === params.author &&
          childData.recipient === params.recipient) ||
        (childData.author === params.recipient &&
          childData.recipient === params.author)
      ) {
        result = childData.message;
        const messageArray = Object.keys(result).map((key) => ({
          id: key,
          ...result[key],
        }));
        result = messageArray;
        return result;
      } else {
        result = false;
        return result;
      }
    });
  });
  return result;
}

export async function createMessage(params, message) {
  console.log("createMessage", params, message);
  let result = await getGroupMessage(params);
  if (!result) {
    await createGroupMessage(params, message);
  } else {
    await sendMessage(params, message, result);
  }
  return;
}
