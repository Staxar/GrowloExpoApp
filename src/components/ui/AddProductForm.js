import {
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

export default function AddProductForm() {
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [pickedImages, setPickedImages] = useState();
  const [selectedUnit, setSelectedUnit] = useState("");
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
      console.log(query);
      if (query) {
        // Inserted query is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
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
        // Inserted query is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredData(phoneCodes);
        setSearchQuery(query);
      }
    },
    [filteredData]
  );

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  function pickImageHandler(imageUri) {
    setPickedImages(imageUri);
  }

  function takePhoneCodeHandler(dial_code, code) {
    setModalVisible(false);
    setSelectedPhoneCode({ dial_code: dial_code, code: code });
  }

  function modalVisableHandler() {
    setModalVisible(!modalVisible);
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
          <PhoneInputForm
            maxLength={9}
            keyboardType={"number-pad"}
            placeholder={"xxx-xxx-xxx"}
            data={selectedPhoneCode}
            onPress={modalVisableHandler}
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
