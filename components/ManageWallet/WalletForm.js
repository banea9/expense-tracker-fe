import { View, Text, StyleSheet, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../../components/UI/Button";
import { useState } from "react";

const styles = StyleSheet.create({
  form: {
    flex: 1,
    // marginTop: 40,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  title: {
    marginVertical: 20,
    fontSize: 24,
    textAlign: "center",
    color: GlobalStyles.colors.white,
    fontWeight: "bold",
  },
  rowInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    color: GlobalStyles.colors.white,
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorMsg: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    marginVertical: 8,
  },
});

const WalletForm = ({ onCancel, onSubmit, submitBtnLabel }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
  });

  const inputChangeHandler = (inputIdentifier, value) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: value,
      };
    });
  };

  const handleSubmit = () => {
    const nameIsValid = inputValue.name.trim().length > 3;
    const descriptionIsValid = inputValue?.description.trim().length > 10;

    if (!nameIsValid || !descriptionIsValid) {
      Alert.alert(
        "Invalid input",
        "Name should be longer then 3 characters and description should be more then 10 characters. "
      );
      return;
    }

    onSubmit(walletData);
  };

  const formIsInvalid = () =>
    inputValue.name.trim().length > 3 ||
    inputValue?.description.trim().length > 10;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Wallet</Text>
      <View style={styles.rowInputContainer}>
        <Input
          style={styles.rowInput}
          invalid={!inputValue.name.isValid}
          label="Name"
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "name"),
            value: inputValue.name,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Creator Email"
          textInputConfig={{
            value: inputValue.creatorEmail,
            editable: false,
          }}
        />
      </View>
      <Input
        invalid={!inputValue.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description,
        }}
      />
      {formIsInvalid() && (
        <Text style={styles.errorMsg}>
          Form is invalid - please check the entered data.
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          {submitBtnLabel}
        </Button>
      </View>
    </View>
  );
};

export default WalletForm;
