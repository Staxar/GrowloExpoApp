import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import LeftIconInput from "../components/ui/LeftIconInput";
import { TextInput } from "react-native-paper";
import { Colors } from "../constans/styles";
import { List } from "react-native-paper";

function AddNewProductScreen({ navigation, route }) {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.contentContainer}>
          <TextInput
            label={"Product to sell"}
            mode="outlined"
            placeholder="eg. Carrots"
            outlineColor={Colors.primary100}
            activeOutlineColor={Colors.primary100}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TextInput
            label={"Product description"}
            mode="outlined"
            placeholder="eg. I would like to sell carrots straight from my field"
            outlineColor={Colors.primary100}
            activeOutlineColor={Colors.primary100}
            multiline
            inputMode="text"
            style={{ minHeight: 100, justifyContent: "center" }}
          />
          <List.Section title="Category">
            <List.Accordion
              title={"Pick product category"}
              left={(props) => <List.Icon {...props} icon="folder" />}
            >
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddNewProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  innerContainer: {
    padding: 20,
    marginHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
});
