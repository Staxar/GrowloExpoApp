import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import { Typography } from "../constans/styles";
import { USERS } from "../../assets/Data/Users";
import UserAvatar from "../components/ui/UserAvatar";
import ChatItem from "../components/ui/ChatItem";
import { Pressable } from "react-native";
import { getUsers } from "../util/user";
import { AuthContext } from "../store/auth-context";
import { Alert } from "react-native";

export default function MessageScreen({ navigation, route }) {
  const [userData, setUserData] = useState([{}]);
  const [gettingData, setGettingData] = useState(false);
  const [userUID, setUserUID] = useState();
  const authCtx = useContext(AuthContext);

  async function usersData() {
    getUsers()
      .then((res) => setUserData(res))
      .catch((err) => console.error(err))
      .finally(() => setGettingData(true));
  }

  useEffect(() => {
    setGettingData(false);
    usersData();
    setUserUID(authCtx.uid);

    return;
  }, [navigation, route]);
  function navigationHandler(author, recipient) {
    if (author === recipient) {
      Alert.alert("You can't send message to yourself!");
    } else {
      navigation.navigate("Chat", { author: author, recipient: recipient });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={[Typography.normalTitle, { textAlign: "center" }]}>
          Chat
        </Text>
        <SearchBar placeholder={"Search users..."} />
        <View style={styles.avatarsContainer}>
          <Text>Active Now</Text>
          {gettingData ? (
            <FlatList
              data={userData}
              renderItem={({ item }) => (
                <Pressable onPress={() => navigationHandler(userUID, item.id)}>
                  <UserAvatar
                    userName={item.displayName}
                    userImage={item.photoURL}
                    placeholderImageSource={
                      "D:ProjectsGrowloExpoAppassetsImagesimagePlaceholder.webp"
                    }
                  />
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          ) : (
            <ActivityIndicator size={"large"} />
          )}
        </View>

        {gettingData ? (
          <FlatList
            data={userData}
            renderItem={({ item }) => (
              <ChatItem
                userName={item.displayName}
                userImage={item.photoURL}
                message={item.message}
                status={item.status}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <ActivityIndicator size={"large"} />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  avatarsContainer: {
    padding: 10,
    marginVertical: 10,
    gap: 10,
  },
});
