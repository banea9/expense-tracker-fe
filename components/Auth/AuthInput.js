import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function AuthInput({
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={GlobalStyles.colors.gray300}
        fontSize={14}
      />
    </View>
  );
}

export default AuthInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.primary800,
    color: GlobalStyles.colors.white,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error500,
    borderRadius: 4,
  },
});
