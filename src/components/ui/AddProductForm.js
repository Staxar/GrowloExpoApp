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
import ContainerOutlinedButton from "./ContainerOutlinedButton";
export default function AddProductForm({ update }) {
  const [selectedImage, setSelectedImage] = useState([]);
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
  }, [selectedPhoneCode]);
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

  const pickLocationHandler = useCallback(
    (location) => {
      setPickedLocation(location);
    },
    [pickedLocation]
  );

  //Take one Image
  function takeImageHandler(imageUri) {
    setSelectedImage([]);
    return setSelectedImage((current) => [...current, imageUri]);
  }
  //Take image from Image Gallery - max 3
  function pickImageHandler(imageUri) {
    setSelectedImage([]);
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
    let arr = [
      payload.prize,
      payload.phoneNumber.number,
      payload.amount,
      payload.selectedUnit,
      payload.selectedCategory,
      payload.enteredTitle,
      payload.description,
    ];
    const isNullOrUndefinedOrEmptyString = (item) => {
      return item === null || item === "" || item === undefined;
    };
    arr.map((item) => {
      if (isNullOrUndefinedOrEmptyString(item)) {
        Alert.alert(`Some input is null, empty, or undefined`);
        return false;
      }
    });
    if (
      isNaN(payload.prize) ||
      isNaN(payload.phoneNumber.number) ||
      isNaN(payload.amount)
    ) {
      Alert.alert("You enter a NaN value!");
    } else if (
      +payload.prize < 0 ||
      +payload.phoneNumber.number < 0 ||
      +payload.amount < 0
    ) {
      Alert.alert("You enter a negative number!");
    } else if (phoneNumberLenght < 9) {
      Alert.alert("Phone number should have 9 digits!");
    } else if (
      payload.pickedLocation === null ||
      payload.pickedLocation === undefined ||
      payload.pickedLocation === ""
    ) {
      Alert.alert("No location taken yet!");
    } else if (
      payload.selectedImage === null ||
      payload.selectedImage === undefined ||
      payload.selectedImage === ""
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
      pickedLocation: pickedLocation,
      selectedUnit: selectedUnit,
      selectedCategory: selectedCategory,
      phoneNumber: { number: phoneNumber, code: selectedPhoneCode },
      amount: amount,
      prize: prize,
      enteredTitle: enteredTitle,
      description: description,
      timestamp: timestamp,
    };
    let phoneNumberLenght = payload.phoneNumber.number.length;
    const validate = validateFormHandler(payload, phoneNumberLenght);

    if (validate) {
      update(payload);
    } else {
      console.log("Not update!");
      return;
    }
  }
  return (
    <View style={styles.outerContainer}>
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
                <ContainerOutlinedButton
                  onPress={() =>
                    takePhoneCodeHandler(item.dial_code, item.code)
                  }
                >
                  <FlagItem
                    countryName={item.name}
                    isoCode={item.code}
                    dial={item.dial_code}
                  />
                </ContainerOutlinedButton>
              )}
              keyExtractor={(item) => item.code}
              extraData={filteredData}
              removeClippedSubviews={true}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.innerContainer}>
        <ImagePickerExample
          onTakeImage={takeImageHandler}
          onPickedImage={pickImageHandler}
        />
        <LocationPicker
          onPickLocation={pickLocationHandler}
          link={"Add Product"}
        />
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
            boxStyles={styles.boxStyles}
            arrowicon={<Ionicons name={"chevron-down-outline"} size={24} />}
            dropdownStyles={styles.dropdownStyles}
            dropdownItemStyles={styles.dropdownItemStyles}
            dropdownTextStyles={styles.dropdownTextStyles}
            inputStyles={styles.inputStyles}
          />
        </TitleForm>
        <TitleForm title={"Unit"}>
          <SelectList
            setSelected={(value) => setSelectedUnit(value)}
            data={data}
            search={true}
            save="value"
            boxStyles={styles.boxStyles}
            arrowicon={<Ionicons name={"chevron-down-outline"} size={24} />}
            dropdownStyles={styles.dropdownStyles}
            dropdownItemStyles={styles.dropdownItemStyles}
            dropdownTextStyles={styles.dropdownTextStyles}
            inputStyles={styles.inputStyles}
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
  outerContainer: {
    width: "80%",
    alignSelf: "center",
    height: "100%",
  },
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
  dropdownStyles: {
    borderWidth: 0,
  },
  dropdownItemStyles: {
    borderBottomWidth: 0.5,
  },
  dropdownTextStyles: {
    fontSize: 20,
    color: Colors.primary600,
  },
  inputStyles: {
    fontSize: 20,
    color: Colors.primary600,
  },
  boxStyles: {
    borderWidth: 0.7,
    padding: 0,
    margin: 0,
  },
});
