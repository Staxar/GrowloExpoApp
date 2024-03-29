import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import { Typography } from "../constans/styles";
import UserAvatar from "../components/ui/UserAvatar";
import ChatItem from "../components/ui/ChatItem";
import { Pressable } from "react-native";
import { AuthContext } from "../store/auth-context";
import { Alert } from "react-native";
import { getChatsGroupMessage } from "../util/messages";

export default function MessageScreen({ navigation, route }) {
  const [gettingData, setGettingData] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userUID, setUserUID] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const authCtx = useContext(AuthContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  useEffect(() => {
    setGettingData(false);
    setMessages([]);
    const messageData = async () => {
      await getChatsGroupMessage(authCtx.uid)
        .then((res) => {
          if (res !== undefined) {
            res.map((item) => {
              if (item !== undefined) {
                setMessages((prevState) => [...prevState, item]);
              }
            });
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setGettingData(true));
    };
    setUserUID(authCtx.uid);
    messageData();
    return;
  }, [refreshing]);

  function navigationHandler(author, recipient) {
    if (author === recipient) {
      Alert.alert("You can't send message to yourself!");
    } else {
      navigation.navigate("Chat", { author: author, recipient: recipient });
    }
    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={[Typography.normalTitle, { textAlign: "center" }]}>
          Chat
        </Text>
        {/* <SearchBar placeholder={"Search users..."} /> */}
        <View style={styles.avatarsContainer}>
          <Text>Active Now</Text>
          {gettingData && messages ? (
            <FlatList
              data={messages}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    onPress={() =>
                      item.author !== userUID
                        ? navigationHandler(item.recipient, item.author)
                        : navigationHandler(item.author, item.recipient)
                    }
                  >
                    <UserAvatar
                      userUID={
                        item.author !== userUID ? item.author : item.recipient
                      }
                    />
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.id}
              horizontal={true}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : (
            <ActivityIndicator size={"large"} />
          )}
        </View>

        {gettingData && messages ? (
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  item.author !== userUID
                    ? navigationHandler(item.recipient, item.author)
                    : navigationHandler(item.author, item.recipient)
                }
              >
                <ChatItem
                  author={item.author}
                  recipient={item.recipient}
                  messageID={item.id}
                  uid={authCtx.uid}
                  timestamp={item.timestamp}
                />
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
