import { useEffect, useState } from "react";
import { child, get, getDatabase, ref } from "firebase/database";
import { Button, FlatList, SafeAreaView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";

export default function AllProductsScreen({ route, navigation }) {
  const [filteredData, setFilteredData] = useState([]);

  // function filterDataHandler(res) {
  //   res.forEach((response) => {
  //     console.log("RESPONSE: ", response);
  //     setFilteredData({ ...filteredData, description: response.description });
  //   });
  // }

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `products`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const response = Object.values(snapshot.val());
          // response.forEach((res) => {
          //   // if(res.description )
          // });
          setFilteredData(response);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        return error(error);
      });
  }, [route, navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View>
        <View>
          <Text>
            {/* <FlatList 
              data={filteredData}
            />


            {filteredData.map((item) => {
              console.log("ITEM: ", item);
            })} */}
          </Text>
          <Button title="Press ME" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
