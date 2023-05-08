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
import UserAvatar from "../components/ui/UserAvatar";
import ChatItem from "../components/ui/ChatItem";
import { Pressable } from "react-native";
import { getUsers } from "../util/user";
import { AuthContext } from "../store/auth-context";
import { Alert } from "react-native";
import {
  getChatsGroupMessage,
  getLastMessages,
  getMessages,
} from "../util/messages";

export default function MessageScreen({ navigation, route }) {
  const [userData, setUserData] = useState([]);
  const [gettingData, setGettingData] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userUID, setUserUID] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setGettingData(false);
    // const usersData = async () => {
    //   await getUsers()
    //     .then((res) => setUserData(res))
    //     .catch((err) => console.error(err));
    // };
    const messageData = async () => {
      await getChatsGroupMessage(authCtx.uid)
        .then((res) => {
          res.map((item) => {
            if (item !== undefined) {
              setMessages((prevState) => [...prevState, item]);
            }
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setGettingData(true));
    };
    setUserUID(authCtx.uid);
    // usersData();
    messageData();
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
        {/* <Text style={[Typography.normalTitle, { textAlign: "center" }]}>
          Chat
        </Text>
        <SearchBar placeholder={"Search users..."} /> */}
        {/* <View style={styles.avatarsContainer}>
          <Text>Active Now</Text>
          {gettingData && messages ? (
            <FlatList
              data={messages}
              renderItem={({ item }) => {
                if (item.id !== userUID) {
                  return (
                    <Pressable
                      onPress={() => navigationHandler(userUID, item.id)}
                    >
                      <UserAvatar
                        userName={item.displayName}
                        userImage={item.photoURL}
                      />
                    </Pressable>
                  );
                }
              }}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          ) : (
            <ActivityIndicator size={"large"} />
          )}
        </View> */}

        {gettingData && messages ? (
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <ChatItem
                author={item.author}
                recipient={item.recipient}
                messages={[item.message]}
                uid={authCtx.uid}
                timestamp={item.timestamp}
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
