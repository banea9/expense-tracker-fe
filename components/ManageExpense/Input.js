import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.white,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.white,
  },
  inputDisabled: {
    color: GlobalStyles.colors.gray300,
  },
  inputMultipline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error500,
  },
});

const Input = ({ label, style, textInputConfig, invalid }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultipline,
          textInputConfig?.editable === false && styles.inputDisabled,
          invalid && styles.invalidInput,
        ]}
        {...textInputConfig}
        placeholderTextColor={GlobalStyles.colors.gray300}
      />
    </View>
  );
};

export default Input;
