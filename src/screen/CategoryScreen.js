import { child, get, getDatabase, ref } from "firebase/database";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Text } from "react-native";
import CategoryItem from "../components/ui/CategoryItem";
import { FlatList } from "react-native";
import { DATA_CATEGORY } from "../../assets/Data/DATA_CATEGORY";
import { SectionList } from "react-native";
import { center } from "@cloudinary/transformation-builder-sdk/qualifiers/textAlignment";

export default function CategoryScreen() {
  // const dbRef = ref(getDatabase());
  // get(child(dbRef, `products`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.itemContainer}>
        <FlatList
          data={DATA_CATEGORY}
          numColumns={3}
          renderItem={({ item }) => <CategoryItem item={item} />}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 20,
    margin: 5,
  },
  innerContainer: {
    marginVertical: 24,
  },
  itemContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
