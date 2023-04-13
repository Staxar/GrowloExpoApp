import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImagePickerExample from "./ImagePicker";
import LeftIconInput from "./LeftIconInput";
import LocationPicker from "./LocationPicker";
import Button from "./Button";
import { useCallback, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { data } from "../../../assets/Data/Unit";
import TitleForm from "./TitleForm";
import { Colors, Typography } from "../../constans/styles";
import { Ionicons } from "@expo/vector-icons";
import PhoneInputForm from "./PhoneInputForm";

export default function AddProductForm() {
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [pickedImages, setPickedImages] = useState();
  const [selectedUnit, setSelectedUnit] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  function pickImageHandler(imageUri) {
    setPickedImages(imageUri);
  }

  function savePlaceHandler() {
    console.log(selectedImage, "image");
    console.log("SELECTED IMAGES: ", pickedImages);
    console.log(pickedLocation, "location");
    console.log(selectedUnit);
  }

  return (
    <ScrollView>
      <View
        style={{
          width: "80%",
          alignSelf: "center",
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={styles.innerContainer}>
          <ImagePickerExample
            onTakeImage={takeImageHandler}
            onPickedImage={pickImageHandler}
          />
          <LocationPicker onPickLocation={pickLocationHandler} />
          <LeftIconInput textValue={"Title"} placeholder={"Carrots"} />
          <LeftIconInput
            textValue={"Description"}
            multiline={true}
            placeholder={"I have red apples to give away on my plot"}
          />
          <TitleForm title={"Unit"}>
            <SelectList
              setSelected={(value) => setSelectedUnit(value)}
              data={data}
              search={true}
              save="value"
              boxStyles={{
                borderWidth: 1,
                padding: 0,
                margin: 0,
              }}
              arrowicon={<Ionicons name={"chevron-down-outline"} size={24} />}
              dropdownStyles={{ borderWidth: 0 }}
              dropdownItemStyles={{ borderBottomWidth: 1 }}
              dropdownTextStyles={{ fontSize: 20, color: Colors.primary600 }}
              inputStyles={{ fontSize: 20, color: Colors.primary600 }}
            />
          </TitleForm>
          <View
            style={{
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <LeftIconInput
              textValue={"Quantity"}
              keyboardType={"number-pad"}
              placeholder={"100"}
            />
            <LeftIconInput
              textValue={"Weight"}
              keyboardType={"number-pad"}
              placeholder={"1"}
            />
          </View>
          <LeftIconInput
            textValue={"Prize"}
            keyboardType={"number-pad"}
            placeholder={"0.00"}
          />
          {/* <LeftIconInput
            textValue={"Phone number"}
            keyboardType={"number-pad"}
            placeholder={"xxx-xxx-xxx"}
          /> */}
          <PhoneInputForm
            maxLength={9}
            keyboardType={"number-pad"}
            placeholder={"xxx-xxx-xxx"}
          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
          <Button onPress={savePlaceHandler}>Add Place</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    padding: 20,
    width: "100%",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
