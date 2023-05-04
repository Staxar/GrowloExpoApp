import { StyleSheet, Text, View } from "react-native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import UserAvatar from "../components/ui/UserAvatar";
import { Colors, Typography } from "../constans/styles";
import Message from "../components/ui/Message";
import { KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import {
  createGroupMessage,
  getGroupMessage,
  getMessages,
  listenMessages,
  sendMessage,
} from "../util/messages";
import { getUser } from "../util/user";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
export default function ChatScreen({ navigation, route }) {
  const [routeParams, setRouteParams] = useState({});
  const [message, setMessage] = useState();
  const [recipient, setRecipiet] = useState({});
  const [messageData, setMessageData] = useState();
  const [gettingData, setGettingData] = useState(false);
  const [groupId, setGroupId] = useState();

  async function getData(recipient) {
    await getUser(recipient)
      .then((response) => setRecipiet(response))
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    const chatMessageHandler = async () => {
      let result = await getGroupMessage(route.params);
      if (!result) {
        let groupId = await createGroupMessage(route.params);
        setGroupId(groupId);
        getMessages(groupId)
          .then((res) => setMessageData(res))
          .catch((err) => console.error(err));
      } else {
        setGroupId(result);
        getMessages(result)
          .then((res) => setMessageData(res))
          .catch((err) => console.error(err));
      }
    };

    chatMessageHandler().catch((err) => console.error(err));
    setGettingData(true);
    return;
  }, []);

  useEffect(() => {
    setRouteParams(route.params);
    if (route.params) getData(route.params.recipient);
  }, [navigation, route]);

  async function sendMessageHandler() {
    await sendMessage(routeParams, message, groupId);
    listenMessages(groupId).then((res) =>
      setMessageData((prevState) => [...prevState, res])
    );
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <UserAvatar
          userName={recipient.displayName}
          userImage={recipient.photoURL}
        />
      ),
    });
  }, [recipient]);

  let view = <ActivityIndicator size={"large"} />;
  if (gettingData && messageData) {
    view = (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {recipient && (
            <Text style={[Typography.bigTitle, { color: "black" }]}>
              {recipient.displayName}
            </Text>
          )}
          <Text>x</Text>
          {messageData && (
            <FlatList
              data={messageData}
              renderItem={({ item }) => (
                <Message
                  message={item.content}
                  right={item.author === route.params.author ? true : false}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              borderWidth: 0.7,
              borderRadius: 8,
              borderColor: Colors.primary800,
              justifyContent: "center",
              backgroundColor: "#ffff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  margin: 8,
                  width: "70%",
                }}
                placeholder="Type somethnig!"
                multiline={true}
                onChangeText={setMessage}
                value={message}
              />
              <View style={{ flex: 1 }}>
                <OutlinedButton onPress={sendMessageHandler}>
                  Send <Ionicons name="send" size={12} />
                </OutlinedButton>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
  return view;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "10%",
  },
  innerContainer: {
    flex: 1,
  },
});
