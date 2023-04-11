import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import LeftIconInput from "../components/ui/LeftIconInput";

import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
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

    const auth = getAuth();
    // const myUserId = auth.currentUser.uid; Get UserID
    updateUserHandler(
      payload.username
      // payload.email,
      // payload.adress,
      // payload.phone
    );
  }
  function updateUserHandler(username) {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        Alert.alert("Profile updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function writeUserData(userId, username, email, adress, phone) {
  //   console.log("db");
  //   const db = getDatabase();
  //   set(ref(db, "users/" + userId), {
  //     username: username,
  //     email: email,
  //     adress: adress,
  //     phone: phone,
  //   });
  // }

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
