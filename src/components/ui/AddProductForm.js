import {
  Alert,
  FlatList,
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
import { useCallback, useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { data } from "../../../assets/Data/Unit";
import TitleForm from "./TitleForm";
import { Colors } from "../../constans/styles";
import { Ionicons } from "@expo/vector-icons";
import PhoneInputForm from "./PhoneInputForm";
import OutlinedButton from "./OutlinedButton";
import SearchBar from "./SearchBar";
import { phoneCodes } from "../../../assets/Data/PhoneCodes";
import FlagItem from "./FlagItem";

export default function AddProductForm({ update }) {
  const [selectedImage, setSelectedImage] = useState();
  const [pickedImages, setPickedImages] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [prize, setPrize] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, isValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState({
    code: phoneCodes[0].code,
    dial_code: phoneCodes[0].dial_code,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(phoneCodes);
  }, []);
  const onSearch = useCallback(
    (query) => {
      if (query) {
        const newData = phoneCodes.filter(function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : "".toUpperCase();
          const textData = query.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
        setSearchQuery(query);
      } else {
        setFilteredData(phoneCodes);
        setSearchQuery(query);
      }
    },
    [filteredData]
  );

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  //Take one Image
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  //Take image from Image Gallery - max 3
  function pickImageHandler(imageUri) {
    // console.log(imageUri);
    setPickedImages(imageUri);
  }

  function takePhoneCodeHandler(dial_code, code) {
    setModalVisible(false);
    setSelectedPhoneCode({ dial_code: dial_code, code: code });
  }

  function modalVisableHandler() {
    setModalVisible(!modalVisible);
  }

  function validateFormHandler(payload, phoneNumberLenght) {
    let selectedImage = payload.selectedImage;
    let pickedImages = payload.pickedImages;
    let pickedLocation = payload.pickedLocation;
    let selectedUnit = payload.selectedUnit;
    let selectedPhoneCode = payload.selectedPhoneCode;
    let weight = payload.weight;
    let quantity = payload.quantity;
    let phoneNumber = payload.phoneNumber;
    let prize = payload.prize;
    let enteredTitle = payload.enteredTitle;
    let description = payload.description;
    if (
      isNaN(prize) ||
      isNaN(phoneNumber) ||
      isNaN(quantity) ||
      isNaN(weight)
    ) {
      Alert.alert("You enter a NaN value!");
    } else if (+prize < 0 || +phoneNumber < 0 || +quantity < 0 || +weight < 0) {
      Alert.alert("You enter a negative number!");
    } else if (
      prize === null ||
      prize === undefined ||
      prize === "" ||
      phoneNumber === null ||
      phoneNumber === undefined ||
      phoneNumber === "" ||
      quantity === null ||
      quantity === undefined ||
      quantity === "" ||
      weight === null ||
      weight === undefined ||
      weight === "" ||
      selectedPhoneCode === null ||
      selectedPhoneCode === undefined ||
      selectedPhoneCode === "" ||
      selectedUnit === null ||
      selectedUnit === undefined ||
      selectedUnit === "" ||
      pickedLocation === null ||
      pickedLocation === undefined ||
      pickedLocation === "" ||
      enteredTitle === null ||
      enteredTitle === undefined ||
      enteredTitle === "" ||
      description === null ||
      description === undefined ||
      description === "" ||
      pickedImages === null ||
      pickedImages === undefined ||
      pickedImages === "" ||
      pickedImages === [] ||
      pickedLocation === null ||
      pickedLocation === undefined ||
      pickedLocation === "" ||
      pickedLocation === [] ||
      selectedImage === null ||
      selectedImage === undefined ||
      selectedImage === "" ||
      selectedImage === []
    ) {
      Alert.alert("You left some input!");
    } else if (phoneNumberLenght < 9) {
      Alert.alert("Phone number should have 9 digits!");
    } else {
      console.log(pickedImages, selectedImage, pickedLocation);
      console.log("OK");
    }

    return;
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "title":
        setEnteredTitle(enteredValue);
        break;
      case "description":
        setDescription(enteredValue);
        break;
      case "adress":
        setenteredAdress(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "username":
        setenteredUsername(enteredValue);
        break;
      case "quantity":
        setQuantity(enteredValue);
        break;
      case "weight":
        setWeight(enteredValue);
        break;
      case "prize":
        setPrize(enteredValue);
        break;
      case "phone":
        setPhoneNumber(enteredValue);
        break;
    }
  }

  function savePlaceHandler() {
    const payload = {
      selectedImage: selectedImage,
      pickedImages: pickedImages,
      pickedLocation: pickedLocation,
      selectedUnit: selectedUnit,
      selectedPhoneCode: selectedPhoneCode,
      phoneNumber: phoneNumber,
      weight: weight,
      quantity: quantity,
      prize: prize,
      enteredTitle: enteredTitle,
      description: description,
    };
    let phoneNumberLenght = payload.phoneNumber.length;
    validateFormHandler(payload, phoneNumberLenght);
    if (valid) {
      update(payload);
    } else {
      console.log("Not update");
      return;
    }
  }

  return (
    <ScrollView>
      <View
        style={{
          width: "80%",
          alignSelf: "center",
          height: "100%",
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
            <View style={{ width: "80%" }}>
              <View style={{ height: 80, marginVertical: 50, padding: 8 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => [setModalVisible(!modalVisible), onSearch]}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
                <View style={{ height: 60 }}>
                  <SearchBar
                    placeholder={"eg. Poland"}
                    value={searchQuery}
                    onChangeText={(query) => onSearch(query)}
                  />
                </View>
              </View>
            </View>
            <View style={{ width: "80%", padding: 8, flex: 1 }}>
              <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                  <OutlinedButton
                    onPress={() =>
                      takePhoneCodeHandler(item.dial_code, item.code)
                    }
                  >
                    <FlagItem
                      countryName={item.name}
                      isoCode={item.code}
                      dial={item.dial_code}
                    />
                  </OutlinedButton>
                )}
                keyExtractor={(item) => item.code}
                extraData={filteredData}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.innerContainer}>
          <ImagePickerExample
            onTakeImage={takeImageHandler}
            onPickedImage={pickImageHandler}
          />
          <LocationPicker onPickLocation={pickLocationHandler} />
          <LeftIconInput
            textValue={"title"}
            placeholder={"Carrots"}
            onUpdateValue={updateInputValueHandler.bind(this, "title")}
            maxLength={20}
          />
          <LeftIconInput
            textValue={"Description"}
            multiline={true}
            placeholder={"I have red apples to give away on my plot"}
            onUpdateValue={updateInputValueHandler.bind(this, "description")}
          />
          <TitleForm title={"Unit"}>
            <SelectList
              setSelected={(value) => setSelectedUnit(value)}
              data={data}
              search={true}
              save="value"
              boxStyles={{
                borderWidth: 0.5,
                padding: 0,
                margin: 0,
              }}
              arrowicon={<Ionicons name={"chevron-down-outline"} size={24} />}
              dropdownStyles={{ borderWidth: 0 }}
              dropdownItemStyles={{ borderBottomWidth: 0.5 }}
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
              onUpdateValue={updateInputValueHandler.bind(this, "quantity")}
            />
            <LeftIconInput
              textValue={"Weight"}
              keyboardType={"number-pad"}
              placeholder={"1"}
              onUpdateValue={updateInputValueHandler.bind(this, "weight")}
            />
          </View>
          <LeftIconInput
            textValue={"Prize"}
            keyboardType={"number-pad"}
            placeholder={"0.00"}
            onUpdateValue={updateInputValueHandler.bind(this, "prize")}
          />
          <PhoneInputForm
            maxLength={9}
            keyboardType={"number-pad"}
            contentType={"telephoneNumber"}
            placeholder={"xxx-xxx-xxx"}
            data={selectedPhoneCode}
            onPress={modalVisableHandler}
            onUpdateValue={updateInputValueHandler.bind(this, "phone")}
          />
          <OutlinedButton onPress={savePlaceHandler}>
            Add product
          </OutlinedButton>
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
    height: "100%",
    width: "100%",
    backgroundColor: "#ffff",
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
    backgroundColor: Colors.primary100,
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
