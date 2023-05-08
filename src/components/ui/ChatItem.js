import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../constans/styles";
import UserAvatar from "./UserAvatar";
import { useEffect, useState } from "react";
import { getUser } from "../../util/user";
import {
  getDatabase,
  limitToLast,
  onChildAdded,
  query,
  ref,
} from "firebase/database";

export default function ChatItem({
  author,
  recipient,
  uid,
  timestamp,
  messageID,
}) {
  const [user, setUser] = useState();
  const [dataAviable, setDataAviable] = useState(false);
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    setDataAviable(false);
    const usersData = async () => {
      await getUser(author === uid ? recipient : author)
        .then((res) => setUser(res))
        .catch((err) => console.error(err));
    };

    const db = getDatabase();
    const messagesRef = query(
      ref(db, "messages/" + messageID + "/message/"),
      limitToLast(1)
    );

    onChildAdded(messagesRef, (response) => {
      let data = Object.assign(response.val(), { id: response.key });
      setMessageData(data.content);
    });
    setDataAviable(true);
    usersData();
  }, []);

  let view = <ActivityIndicator size={"large"} />;
  if (dataAviable && user && messageData) {
    view = (
      <View style={styles.container}>
        <UserAvatar userImage={user.photoURL ? user.photoURL : undefined} />
        <View style={styles.innerContainer}>
          <Text>{user.displayName}</Text>
          <Text numberOfLines={1} style={Typography.smallDescription}>
            {messageData}
          </Text>
        </View>
        {/* {status ? (
    <View style={styles.active}></View>
  ) : (
    <View style={styles.inactive}></View>
  )} */}
      </View>
    );
  }
  return view;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    height: 60,
    backgroundColor: "white",
    padding: 4,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  innerContainer: {
    width: "65%",
    marginHorizontal: 10,
  },
  active: {
    height: 10,
    width: 10,
    backgroundColor: Colors.primary100,
    borderRadius: 10 / 2,
  },
  inactive: {
    height: 10,
    width: 10,
    backgroundColor: Colors.error800,
    borderRadius: 10 / 2,
  },
});
