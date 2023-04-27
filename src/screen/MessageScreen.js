import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchBar from "../components/ui/SearchBar";
import { Typography } from "../constans/styles";
import { USERS } from "../../assets/Data/Users";
import UserAvatar from "../components/ui/UserAvatar";
import ChatItem from "../components/ui/ChatItem";

export default function MessageScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={[Typography.normalTitle, { textAlign: "center" }]}>
          Chat
        </Text>
        <SearchBar placeholder={"Search users..."} />
        <View style={styles.avatarsContainer}>
          <Text>Active Now</Text>
          <FlatList
            data={USERS}
            renderItem={({ item }) => (
              <UserAvatar
                userName={item.name}
                userImage={item.image_path}
                placeholderImageSource={
                  "D:ProjectsGrowloExpoAppassetsImagesimagePlaceholder.webp"
                }
              />
            )}
            keyExtractor={(item) => item.key}
            horizontal={true}
          />
        </View>

        <FlatList
          data={USERS}
          renderItem={({ item }) => (
            <ChatItem
              userName={item.name}
              userImage={item.image_path}
              placeholderImageSource={
                "D:ProjectsGrowloExpoAppassetsImagesimagePlaceholder.webp"
              }
              message={item.message}
              status={item.status}
            />
          )}
          keyExtractor={(item) => item.key}
        />
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
