import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { View } from "react-native";
import CategoryItem from "../components/ui/CategoryItem";
import { FlatList } from "react-native";
import { DATA_CATEGORY } from "../../assets/Data/DATA_CATEGORY";

export default function CategoryScreen({ navigation, route }) {
  function NavigationHandler(params) {
    navigation.navigate("AllProducts", { itemParams: params.category });
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.itemContainer}>
        <FlatList
          data={DATA_CATEGORY}
          numColumns={3}
          renderItem={({ item }) => (
            <CategoryItem
              id={item.key}
              icon_name={item.icon_name}
              category={item.value}
              nav={NavigationHandler}
            />
          )}
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
