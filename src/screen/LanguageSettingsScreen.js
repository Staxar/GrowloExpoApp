import Checkbox from "expo-checkbox";
import { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Colors, Typography } from "../constans/styles";

const data = [
  { id: 0, txt: "Polski", isChecked: false },
  { id: 1, txt: "English", isChecked: true },
  { id: 2, txt: "Español", isChecked: false },
];

export default function LanguageSettingsScreen() {
  const [isChecked, setChecked] = useState(data);

  // Add data to db

  const changeHandler = (id) => {
    let temp = isChecked.map((item) => {
      if (id === item.id) {
        return { ...item, isChecked: true };
      } else {
        return { ...item, isChecked: false };
      }
      return item;
    });
    setChecked(temp);
  };

  return (
    <View style={styles.container}>
      <Text style={Typography.normalTitle}>Change your preferred language</Text>
      <View style={styles.innerContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked[item.id].isChecked}
                onValueChange={() => {
                  changeHandler(item.id);
                }}
                color={isChecked ? Colors.primary100 : undefined}
              />
              <Text>{item.txt}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 40,
    alignItems: "center",
  },
  itemContainer: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: "grey",
    height: 80,
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});
