import {
  Alert,
  FlatList,
  Modal,
  Pressable,
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
import { DATA_CATEGORY } from "../../../assets/Data/DATA_CATEGORY";
import { uploadImage } from "../../util/uploadImage";
export default function AddProductForm({ update }) {
  const [selectedImage, setSelectedImage] = useState();
  const [pickedImages, setPickedImages] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [prize, setPrize] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    return;
  }
  //Take image from Image Gallery - max 3
  function pickImageHandler(imageUri) {
    return setSelectedImage(imageUri);
  }

  function takePhoneCodeHandler(dial_code, code) {
    setModalVisible(false);
    setSelectedPhoneCode({ dial_code: dial_code, code: code });
  }

  function modalVisableHandler() {
    setModalVisible(!modalVisible);
  }

  function validateFormHandler(payload, phoneNumberLenght) {
    console.log("payload", payload);
    let selectedImage = payload.selectedImage;
    let pickedLocation = payload.pickedLocation;
    let selectedUnit = payload.selectedUnit;
    let selectedPhoneCode = payload.selectedPhoneCode;
    let amount = payload.amount;
    let phoneNumber = payload.phoneNumber;
    let prize = payload.prize;
    let enteredTitle = payload.enteredTitle;
    let description = payload.description;
    let selectedCategory = payload.selectedCategory;

    if (isNaN(prize) || isNaN(phoneNumber) || isNaN(amount)) {
      Alert.alert("You enter a NaN value!");
    } else if (+prize < 0 || +phoneNumber < 0 || +amount < 0) {
      Alert.alert("You enter a negative number!");
    } else if (
      //TO FIX!
      prize === null ||
      prize === undefined ||
      prize === "" ||
      phoneNumber === null ||
      phoneNumber === undefined ||
      phoneNumber === "" ||
      amount === null ||
      amount === undefined ||
      amount === "" ||
      selectedPhoneCode === null ||
      selectedPhoneCode === undefined ||
      selectedPhoneCode === "" ||
      selectedUnit === null ||
      selectedUnit === undefined ||
      selectedUnit === "" ||
      selectedCategory === null ||
      selectedCategory === undefined ||
      selectedCategory === "" ||
      enteredTitle === null ||
      enteredTitle === undefined ||
      enteredTitle === "" ||
      description === null ||
      description === undefined ||
      description === ""
    ) {
      Alert.alert("You left some input!");
    } else if (phoneNumberLenght < 9) {
      Alert.alert("Phone number should have 9 digits!");
    } else if (
      pickedLocation === null ||
      pickedLocation === undefined ||
      pickedLocation === ""
    ) {
      Alert.alert("No location taken yet!");
    } else if (
      selectedImage === null ||
      selectedImage === undefined ||
      selectedImage === ""
    ) {
      Alert.alert("No image taken yet!");
    } else {
      return true;
    }
    return false;
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
      case "username":
        setenteredUsername(enteredValue);
        break;
      case "amount":
        setAmount(enteredValue);
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
    let timestamp = new Date().toDateString();
    const payload = {
      selectedImage: selectedImage,
      // pickedImages: pickedImages,
      pickedLocation: pickedLocation,
      selectedUnit: selectedUnit,
      selectedCategory: selectedCategory,
      selectedPhoneCode: selectedPhoneCode,
      phoneNumber: phoneNumber,
      amount: amount,
      prize: prize,
      enteredTitle: enteredTitle,
      description: description,
      timestamp: timestamp,
    };
    let phoneNumberLenght = payload.phoneNumber.length;
    const validate = validateFormHandler(payload, phoneNumberLenght);
    const imageUpdate = uploadImage(selectedImage);
    if (validate && imageUpdate) {
      console.log(validate, imageUpdate);
      update(payload);
    } else {
      console.log("Not update!");
      return;
    }
  }

  return (
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
          <View
            style={{ height: 80, marginVertical: 50, padding: 8, width: "80%" }}
          >
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
        <TitleForm title={"Category"}>
          <SelectList
            setSelected={(value) => setSelectedCategory(value)}
            data={DATA_CATEGORY}
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

        <LeftIconInput
          textValue={"Amount"}
          keyboardType={"number-pad"}
          placeholder={"100"}
          onUpdateValue={updateInputValueHandler.bind(this, "amount")}
        />
        <LeftIconInput
          textValue={"Prize"}
          keyboardType={"number-pad"}
          placeholder={"50"}
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

        <OutlinedButton onPress={savePlaceHandler}>Add product</OutlinedButton>
      </View>
    </View>
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
  container: {
    flex: 1,
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
