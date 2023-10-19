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
import { DATA_CATEGORY } from "../../assets/Data/DATA_CATEGORY";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { data } from "../../assets/Data/Unit";
function AddNewProductScreen({ navigation, route }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState({
    value: "Pick product category",
    icon: "",
  });

  const handlePress = (value, icon) => {
    setCategory({ value: value, icon: icon });
  };
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
            maxLength={255}
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
            maxLength={500}
          />
          <TextInput
            label={"Product prize"}
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={10}
            mode="outlined"
            placeholder="eg. 125.6"
            placeholderTextColor={"grey"}
            outlineColor={Colors.primary100}
            activeOutlineColor={Colors.primary100}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TextInput
            label={"Product amount"}
            placeholderTextColor={"grey"}
            mode="outlined"
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={10}
            placeholder="eg. amount"
            outlineColor={Colors.primary100}
            activeOutlineColor={Colors.primary100}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <List.AccordionGroup>
            <List.Accordion
              title="Pick product category"
              id="0"
              rippleColor={Colors.primary100}
            >
              <List.Item title="Item 1" />
            </List.Accordion>
            <List.Accordion
              title="Pick product unit"
              id="1"
              rippleColor={Colors.primary100}
            >
              <List.Item title="Item 2" />
            </List.Accordion>
          </List.AccordionGroup>
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
    gap: 14,
  },
});
