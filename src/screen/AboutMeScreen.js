import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import { useContext, useEffect, useState } from "react";
import { getUser, updateUserImage } from "../util/user";
import ImagePickerExample from "../components/ui/ImagePicker";
import OutlinedButton from "../components/ui/OutlinedButton";
import { uploadImage } from "../util/uploadImage";
import { ActivityIndicator } from "react-native";
import {
  AuthCredential,
  EmailAuthCredential,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
} from "firebase/auth";
import ModalForm from "../components/Auth/ModalForm";
function AboutMeScreen({ navigation, route }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [user, setUser] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const authCtx = useContext(AuthContext);

  async function submitHandler() {
    if (photoUrl === undefined || photoUrl === "") {
      return;
    } else {
      await updateUserImage(photoUrl, authCtx.uid);
    }
  }

  useEffect(() => {
    getUser(authCtx.uid).then((res) => setUser(res));
  }, [navigation, route]);

  function onTakeImageHandler(imageUri) {
    setPhotoUrl(imageUri);
  }
  function onOneImageHandler(imageUri) {
    setPhotoUrl(imageUri);
  }

  if (user) {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ImagePickerExample
          onTakeImage={onTakeImageHandler}
          takeOneImage={onOneImageHandler}
          placeholderImage={user.photoURL}
        />
        <View style={styles.innerContainer}>
          <TextInput
            style={styles.input}
            placeholder={user.displayName}
            value={name}
            onChangeText={(text) => setName(text)}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder={user.email}
            value={email}
            onChangeText={(text) => setEmail(text)}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder={"phoneNumber"}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            editable={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <OutlinedButton onPress={submitHandler}>Update</OutlinedButton>
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return <ActivityIndicator size={"large"} />;
  }
}

export default AboutMeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
