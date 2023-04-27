import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../constans/styles";

import DetailProductComponent from "../components/ui/DetailProductComponent";
import { ActivityIndicator } from "react-native";
import { getProduct } from "../util/getProducts";

export default function ProductDetailsScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [id, setId] = useState(route.params);

  async function getData() {
    await getProduct(id)
      .then((res) => setData(res))
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    if (route.params) {
      setId(route.params);
    } else {
      Alert.alert("Something goes wrong!");
    }
    getData();
  }, [navigation, route]);

  let componentPreview = (
    <ActivityIndicator color={Colors.primary100} size={"large"} />
  );

  if (data === []) {
    console.log("Something goes wrong!", data);
  } else {
    componentPreview = (
      <DetailProductComponent
        id={id}
        title={data.title}
        prize={data.prize}
        unit={data.unit}
        description={data.description}
        pickedLocation={data.pickedLocation}
        selectedImage={data.selectedImage}
      />
    );
  }
  return <View style={{ flex: 1, padding: 20 }}>{componentPreview}</View>;
}

const styles = StyleSheet.create({});
