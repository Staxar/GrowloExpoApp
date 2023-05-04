import {
  child,
  get,
  getDatabase,
  onChildAdded,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

const db = getDatabase();

export async function getGroupMessage(params) {
  let result;
  const dbRef = ref(db);
  await get(child(dbRef, "messages/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
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
      } else {
        console.error(snapshot.val());
      }
    })
    .catch((err) => console.error(err));
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
  const response = await set(newMessageRef, {
    author: params.author,
    recipient: params.recipient,
    timestamp: timestamp,
  })
    .then(() => {
      return newMessageRef.key;
    })
    .catch((e) => {
      console.error(e);
    });
  return response;
}
export async function getMessages(groupId) {
  const dbRef = ref(getDatabase());
  const result = await get(child(dbRef, `messages/${groupId}/message`));
  if (result) {
    const data = result.val();
    const messageArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    return messageArray;
  } else {
    console.log("error");
  }
}

export async function listenMessages(groupId) {
  console.log("listenMessages:", groupId);
  if (!groupId) {
    return;
  }
  let data;
  const messagesRef = ref(db, "messages/" + groupId + "/message/");
  onChildAdded(messagesRef, (response) => {
    data = response.val();
    data = Object.assign(data, { id: response.key });
    return data;
  });
  return data;
}

export async function createMessage(params, message) {
  console.log("createMessage", params, message);
  let result = await getGroupMessage(params);
  if (!result) {
    await createGroupMessage(params, message);
  } else {
    await sendMessage(params, message, result);
    listenMessages();
  }
  return;
}
