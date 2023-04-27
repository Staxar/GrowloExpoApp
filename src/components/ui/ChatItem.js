import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserAvatar from "./UserAvatar";
import { Colors, Typography } from "../../constans/styles";

export default function ChatItem({ userName, userImage, message, status }) {
  return (
    <View style={styles.container}>
      <UserAvatar userImage={userImage} />
      <View style={{ width: "65%", marginHorizontal: 10 }}>
        <Text>{userName}</Text>
        <Text numberOfLines={1} style={Typography.smallDescription}>
          {message}
        </Text>
      </View>
      {status ? (
        <View style={styles.active}></View>
      ) : (
        <View style={styles.inactive}></View>
      )}
    </View>
  );
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
