import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import { Colors } from "../../constans/styles";
import { TextInput } from "react-native";

export default function ModalForm({
  modalText,
  onPress,
  modalVisible,
  promptForCredentials,
}) {
  const [password, setPassword] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onPress;
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modalText}</Text>
          <View style={{ width: 250, height: 50 }}>
            <TextInput
              placeholder="Confirm password"
              value={password}
              onChangeText={setPassword}
              textContentType="password"
              secureTextEntry={true}
            />
          </View>
          <View style={{ flexDirection: "row", padding: 8, gap: 8 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress}
            >
              <Text style={styles.textStyle}>Exit</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={() => promptForCredentials(password)}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    elevation: 2,
    height: 35,
    width: 100,
    justifyContent: "center",
  },
  buttonConfirm: {
    backgroundColor: Colors.primary100,
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
