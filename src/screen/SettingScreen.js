import { Pressable, StyleSheet, Text, View } from "react-native";

import OutlinedButtonWithIcon from "../components/ui/OutlinedButtonWithIcon";

export default function SettingScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("AddressSettingsScreen")}>
        <OutlinedButtonWithIcon
          iconName={"chevron-forward-outline"}
          textValue={"Your Addresses"}
        />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("NotificationSettingsScreen")}
      >
        <OutlinedButtonWithIcon
          iconName={"chevron-forward-outline"}
          textValue={"Notifications"}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("LanguageSettingsScreen")}>
        <OutlinedButtonWithIcon
          iconName={"chevron-forward-outline"}
          textValue={"Languages"}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
});
