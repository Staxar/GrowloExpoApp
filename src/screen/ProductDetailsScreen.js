import { Alert, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Colors } from "../constans/styles";

import DetailProductComponent from "../components/ui/DetailProductComponent";
import { ActivityIndicator } from "react-native";
import { getProduct } from "../util/getProducts";
import { AuthContext } from "../store/auth-context";

export default function ProductDetailsScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [id, setId] = useState(route.params);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await getProduct(id)
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    };
    fetchData().catch((err) => console.error(err));
  }, [navigation, route]);

  function sendMessageHandler() {
    const author = authCtx.uid;
    const recipient = data.uid;
    if (recipient === author) {
      Alert.alert("You can't send message to yourself!");
    } else {
      navigation.navigate("Chat", { author: author, recipient: recipient });
    }
  }

  let mountComponent = (
    <ActivityIndicator color={Colors.primary100} size={"large"} />
  );

  if (data === []) {
    console.log("Something goes wrong!", data);
  } else {
    mountComponent = (
      <DetailProductComponent
        id={id}
        title={data.title}
        prize={data.prize}
        unit={data.unit}
        description={data.description}
        pickedLocation={data.pickedLocation}
        selectedImage={data.selectedImage}
        sendMessage={sendMessageHandler}
      />
    );
  }
  return <View style={styles.container}>{mountComponent}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
