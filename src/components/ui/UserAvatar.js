import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { Typography } from "../../constans/styles";

export default function UserAvatar({ userName, userImage }) {
  const imageSource =
    userImage !== null ? { uri: userImage } : placeholderImageSource;
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.img} />
      {userName && <Text style={Typography.smallDescription}>{userName}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});