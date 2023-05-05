import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "../../constans/styles";
import UserAvatar from "./UserAvatar";
import { useEffect, useState } from "react";
import { getUser } from "../../util/user";
// userName, userImage, message, status
export default function ChatItem({ author, recipient, messages, uid }) {
  const [user, setUser] = useState();
  const [dataAviable, setDataAviable] = useState(false);

  useEffect(() => {
    setDataAviable(false);
    const usersData = async () => {
      await getUser(author === uid ? recipient : author)
        .then((res) => setUser(res))
        .catch((err) => console.error(err))
        .finally(() => setDataAviable(true));
    };

    usersData();
  }, []);

  let view = <ActivityIndicator size={"large"} />;

  if (dataAviable) {
    view = (
      <View style={styles.container}>
        {/* <UserAvatar userImage={userImage} /> */}
        <View style={{ width: "65%", marginHorizontal: 10 }}>
          <Text>{user.displayName}</Text>
          {/* <Text numberOfLines={1} style={Typography.smallDescription}>
      {message}
    </Text> */}
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
