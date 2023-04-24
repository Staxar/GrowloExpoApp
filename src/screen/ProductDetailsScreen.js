import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { child, get, getDatabase, query, ref } from "firebase/database";
import { Colors, Typography } from "../constans/styles";

import { Image } from "react-native";
import { getMapPreview } from "../util/location";
import DetailProductComponent from "../components/ui/DetailProductComponent";
import { ActivityIndicator } from "react-native";

export default function ProductDetailsScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [id, setId] = useState(route.params);

  useEffect(() => {
    const db = getDatabase();
    const getCategoryData = query(ref(db, "products/" + id));

    get(getCategoryData)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          try {
            setData(data);
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        return error(error);
      });
  }, []);

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
