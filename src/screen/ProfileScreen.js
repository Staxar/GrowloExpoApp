import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import LeftIconInput from "../components/ui/LeftIconInput";
import { useState } from "react";
function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [enteredEmail, setEnteredEmail] = useState(email);
  const [enteredAdress, setenteredAdress] = useState("");
  const [enteredUsername, setenteredUsername] = useState("");
  const [enteredPhone, setenteredPhone] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "phone":
        setenteredPhone(enteredValue);
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
    }
  }

  function submitHandler() {
    const payload = {
      username: enteredUsername,
      email: enteredEmail,
      adress: enteredAdress,
      phone: enteredPhone,
    };
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.outerContainer}>
        <View style={styles.userAvatar}>
          <Ionicons name="person-circle-outline" size={70} />
          <Text>UserName</Text>
        </View>
        <LeftIconInput
          textValue={"Username"}
          onUpdateValue={updateInputValueHandler.bind(this, "username")}
          value={enteredUsername}
          iconName={"person-outline"}
        />
        <LeftIconInput
          textValue={"Mobile number"}
          onUpdateValue={updateInputValueHandler.bind(this, "phone")}
          value={enteredPhone}
          iconName={"call-outline"}
          contentType={"telephoneNumber"}
        />
        <LeftIconInput
          textValue={"Adress"}
          onUpdateValue={updateInputValueHandler.bind(this, "adress")}
          value={enteredAdress}
          iconName={"location-outline"}
        />
        <LeftIconInput
          textValue={"Email"}
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          iconName={"mail-outline"}
        />

        <Button onPress={submitHandler} title="Submit" />
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  outerContainer: {
    flexDirection: "column",
    padding: 8,
    margin: 8,
    alignItems: "center",
  },
  userAvatar: {
    alignItems: "center",
    marginVertical: 24,
  },
});
