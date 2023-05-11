import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { Typography } from "../../constans/styles";
import { useEffect, useState } from "react";
import { getUser } from "../../util/user";
import { ActivityIndicator } from "react-native";

export default function UserAvatar({ userName, userImage, userUID }) {
  const [userData, setUserData] = useState([]);
  const [gettingData, setGettingData] = useState(false);
  useEffect(() => {
    setGettingData(false);
    const usersData = async () => {
      await getUser(userUID)
        .then((res) => setUserData(res))
        .catch((err) => console.error(err));
    };

    if (userUID) {
      usersData();
    }
    setGettingData(true);
  }, []);
  let imageSource = require("../../../assets/Images/avatarPlaceHolder.png");

  if (userImage !== undefined) {
    imageSource = { uri: userImage };
  } else if (userData.photoURL !== undefined) {
    imageSource = { uri: userData.photoURL };
  }
  let view = <ActivityIndicator size={"large"} />;

  if (gettingData) {
    view = (
      <View style={styles.container}>
        <Image source={imageSource} style={styles.img} />
        {userName ? (
          <Text style={Typography.smallDescription}>{userName}</Text>
        ) : userUID ? (
          <Text style={Typography.smallDescription}>
            {userData.displayName}
          </Text>
        ) : (
          <></>
        )}
      </View>
    );
  }
  return view;
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
