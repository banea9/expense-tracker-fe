import { View, Text, StyleSheet, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "../ManageExpense/Input";
import Button from "../../components/UI/Button";
import { useState } from "react";
import { httpAddWallet } from "../../util/http";
import { addWallet } from "../../store/wallets";
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverlay";

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

const WalletForm = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: { value: "", isValid: true },
    creatorEmail: { value: "", isValid: true },
    description: { value: "", isValid: true },
  });

  const onCancel = () => {
    navigation.goBack();
  };

  const inputChangeHandler = (inputIdentifier, value) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value, isValid: true },
      };
    });
  };

  const handleSubmit = async () => {
    const nameIsValid = inputValue?.name.value.trim().length > 3;
    const descriptionIsValid = inputValue?.description.value.trim().length > 10;
    if (!nameIsValid || !descriptionIsValid) {
      Alert.alert(
        "Invalid input",
        "Name should be longer then 3 characters and description should be more then 10 characters. "
      );
      setInputValue((prevState) => {
        return {
          name: { value: prevState.name.value, isValid: nameIsValid },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    setLoading(true);
    const walletData = {
      name: inputValue.name.value,
      description: inputValue.description.value,
    };
    try {
      const id = await httpAddWallet(walletData);
      dispatch(addWallet({ ...walletData, id }));
      navigation.goBack();
    } catch (err) {
      setError("Could not save wallet. Please try again later");
      setLoading(false);
    }
  };

  if (error && !loading) {
    return <ErrorOverlay message={error} />;
  }

  if (loading) {
    return <LoadingOverlay/>;
  }

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
            value: inputValue.name.value,
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
          value: inputValue.description.value,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          Add
        </Button>
      </View>
    </View>
  );
};

export default WalletForm;
