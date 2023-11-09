import { useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
} from "react-native";
import LeftIconInput from "../components/ui/LeftIconInput";
import { Button, TextInput } from "react-native-paper";
import { Colors } from "../constans/styles";
import { List } from "react-native-paper";
import { DATA_CATEGORY } from "../../assets/Data/DATA_CATEGORY";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { data } from "../../assets/Data/Unit";
import ImagePickerExample from "../components/ui/ImagePicker";
import LocationPicker from "../components/ui/LocationPicker";
import CountryFlag from "react-native-country-flag";
function AddNewProductScreen({ navigation, route }) {
  const [text, setText] = useState("");
  const [prize, setPrize] = useState();
  const [amount, setAmount] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedImage, setSelectedImage] = useState([]);

  const [category, setCategory] = useState({
    value: "Pick product category",
    icon: "",
  });

  //Take one Image
  const takeImageHandler = useCallback(
    (imageUri) => {
      setSelectedImage([]);
      return setSelectedImage((current) => [...current, imageUri]);
    },
    [selectedImage]
  );
  //Take image from Image Gallery - max 3
  const pickImageHandler = useCallback(
    (imageUri) => {
      setSelectedImage([]);
      return setSelectedImage(imageUri);
    },
    [selectedImage]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.contentContainer}>
          <ImagePickerExample
            onTakeImage={takeImageHandler}
            onPickedImage={pickImageHandler}
          />
          <LocationPicker />
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
            value={prize}
            onChangeText={(prize) => setPrize(prize)}
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
            value={amount}
            onChangeText={(amount) => setAmount(amount)}
          />
          <List.AccordionGroup>
            <List.Accordion
              title="Pick product category"
              id="0"
              rippleColor={Colors.primary100}
              style={{
                borderWidth: 1,
                borderColor: Colors.primary100,
                borderRadius: 4,
              }}
            >
              <List.Item title="Item 1" />
            </List.Accordion>
            <List.Accordion
              title="Pick product unit"
              id="1"
              rippleColor={Colors.primary100}
              style={{
                borderWidth: 1,
                borderColor: Colors.primary100,
                borderRadius: 4,
              }}
            >
              <List.Item title="Item 2" />
            </List.Accordion>
          </List.AccordionGroup>

          <View>
            <Text>Phone number</Text>
            <View style={{ flexDirection: "row", gap: 14 }}>
              <Pressable
                style={{ flexDirection: "row", gap: 14, alignItems: "center" }}
              >
                <CountryFlag isoCode="AF" size={24} />
                <Text>(+48)</Text>
              </Pressable>
              <TextInput
                style={{ flex: 1 }}
                mode="outlined"
                outlineColor={Colors.primary100}
                activeOutlineColor={Colors.primary100}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                value={phoneNumber}
                onChangeText={(phone) => setPhoneNumber(phone)}
              />
            </View>
          </View>
          <Button
            icon="export"
            mode="contained"
            style={{ backgroundColor: Colors.primary100, height: 40 }}
            onPress={() => console.log("Pressed")}
          >
            Add new product
          </Button>
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
    flexDirection: "column",
    gap: 14,
    paddingBottom: StatusBar.currentHeight + 20,
  },
});
