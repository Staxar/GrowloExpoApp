import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import TitleForm from "./TitleForm";
import { Typography } from "../../constans/styles";
import { useState } from "react";
import { phoneCodes } from "../../../assets/Data/PhoneCodes";

const PhoneInputForm = ({
  maxLength,
  keyboardType,
  onUpdateValue,
  contentType,
  value,
  placeholder,
}) => {
  const [phoneCode, setPhoneCode] = useState({
    code: phoneCodes[0].code,
    dial: phoneCodes[0].dial_code,
  });
  return (
    <TitleForm title={"Phone number"}>
      <View style={styles.container}>
        <Pressable style={styles.flagContainer}>
          <CountryFlag isoCode={phoneCode.code} size={24} />
          <Text>{phoneCode.dial}</Text>
        </Pressable>
        <TextInput
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onUpdateValue}
          textContentType={contentType}
          value={value}
          placeholder={placeholder}
          style={[Typography.bigDescription, { flex: 1, width: "100%" }]}
        />
      </View>
    </TitleForm>
  );
};

export default PhoneInputForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flagContainer: {
    padding: 2,
    alignItems: "center",
    // backgroundColor: Colors.primary800,
    flexDirection: "row",
    gap: 4,
  },
});
