import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import TitleForm from "./TitleForm";
import CountryFlag from "react-native-country-flag";
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
          <CountryFlag isoCode={data.code} size={24} />
        </Pressable>
        <Text>({data.dial_code})</Text>
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
    gap: 10,
  },
});
