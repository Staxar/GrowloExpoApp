import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import TitleForm from "./TitleForm";

import FlagItem from "./FlagItem";
import { useState } from "react";

const PhoneInputForm = ({
  maxLength,
  keyboardType,
  onUpdateValue,
  contentType,
  value,
  placeholder,
  data,
  onPress,
}) => {
  return (
    <TitleForm title={"Phone number"}>
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <FlagItem
            dial={data.dial_code}
            isoCode={data.code}
            onPress={onPress}
          />
        </Pressable>
        <TextInput
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onUpdateValue}
          textContentType={contentType}
          value={value}
          placeholder={placeholder}
          style={{
            marginLeft: 20,
            flex: 1,
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            fontSize: 24,
          }}
          inputMode="numeric"
        />
      </View>
    </TitleForm>
  );
};

export default PhoneInputForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
});
