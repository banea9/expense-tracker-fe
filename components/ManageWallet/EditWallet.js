import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import {
  httpAddUserToWallet,
  httpRemoveUserFromWallet,
  httpSetActiveWallet,
  httpUpdateWallet,
} from "../../util/http";
import { updateWallet, manipulateWalletUser } from "../../store/wallets";
import { setUserActiveWallet } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { emailRegex, radioButtonsOptions } from "../../util/constants";
import Input from "../ManageExpense/Input";
import Button from "../../components/UI/Button";
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverlay";
import RadioGroup from "react-native-radio-buttons-group";
import { selectWalletUsers } from "../../store/selectors/selector";
import Checkbox from "expo-checkbox";

const errorMessage = (e) =>
  e?.response?.data?.message ?? e?.message ?? "Something went wrong.";

const EditWallet = ({ route, navigation }) => {
  const { _id, name, description } = route.params.wallet;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const walletUsers = useSelector(selectWalletUsers(_id));
  const user = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    name: { value: name || "", isValid: true },
    creatorEmail: { value: user.email, isValid: true },
    description: { value: description || "", isValid: true },
    isActive: { value: user.activeWallet === _id, isValid: true },
    newUser: { value: "", isValid: true },
  });

  // null = no add/remove action chosen; otherwise "add" | "remove".
  const [radioBtnId, setRadioBtnId] = useState(null);

  const isCreator = user.email === inputValue.creatorEmail.value;

  const onCancel = () => navigation.goBack();

  const inputChangeHandler = (inputIdentifier, value) => {
    setInputValue((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value, isValid: true },
    }));
  };

  const resetUserField = () => {
    setInputValue((prevState) => ({
      ...prevState,
      newUser: { value: "", isValid: true },
    }));
  };

  const setActiveWallet = async (value) => {
    inputChangeHandler("isActive", value);
    try {
      await httpSetActiveWallet(_id, user.email, user.token);
      dispatch(setUserActiveWallet({ walletId: _id }));
    } catch (e) {
      setError(errorMessage(e));
    }
  };

  const radioBtnChangeHandler = (value = null) => {
    setRadioBtnId(value);
    resetUserField();
  };

  const handleUser = async () => {
    const emailIsValid = emailRegex.test(inputValue.newUser.value);
    if (!emailIsValid) {
      Alert.alert("Invalid input", "Please enter a valid email.");
      setInputValue((prevState) => ({
        ...prevState,
        newUser: { value: prevState.newUser.value, isValid: false },
      }));
      return;
    }

    setLoading(true);
    const walletData = { id: _id, userEmail: inputValue.newUser.value };
    try {
      const updatedWallet =
        radioBtnId === "add"
          ? await httpAddUserToWallet(walletData, user.token)
          : await httpRemoveUserFromWallet(walletData, user.token);
      dispatch(manipulateWalletUser({ wallet: updatedWallet }));
      radioBtnChangeHandler();
    } catch (e) {
      setError(errorMessage(e));
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const nameIsValid = inputValue?.name.value.trim().length > 3;
    const descriptionIsValid = inputValue?.description.value.trim().length > 10;
    if (!nameIsValid || !descriptionIsValid) {
      Alert.alert(
        "Invalid input",
        "Name should be longer than 3 characters and description should be more than 10 characters."
      );
      setInputValue((prevState) => ({
        ...prevState,
        name: { value: prevState.name.value, isValid: nameIsValid },
        description: {
          value: prevState.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    setLoading(true);
    const walletData = {
      name: inputValue.name.value,
      description: inputValue.description.value,
      creatorEmail: inputValue.creatorEmail.value,
      isActive: inputValue.isActive.value,
    };
    try {
      const updatedWallet = await httpUpdateWallet(_id, walletData, user.token);
      dispatch(updateWallet({ wallet: updatedWallet }));
      navigation.goBack();
    } catch (err) {
      setError(errorMessage(err));
      setLoading(false);
    }
  };

  if (error && !loading) {
    return <ErrorOverlay message={error} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.form}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.rowInputContainer}>
            <Input
              style={styles.rowInput}
              invalid={!inputValue.name.isValid}
              label="Name"
              textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, "name"),
                value: inputValue.name.value,
                editable: isCreator,
              }}
            />
            <Input
              style={styles.rowInput}
              label="Creator Email"
              textInputConfig={{
                value: inputValue.creatorEmail.value,
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
              editable: isCreator,
            }}
          />
          <Input
            label="Users"
            textInputConfig={{
              value: walletUsers.map((u) => u.username).join(", "),
              editable: false,
            }}
          />
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={inputValue.isActive.value}
              onValueChange={setActiveWallet}
              color={
                inputValue.isActive.value
                  ? GlobalStyles.colors.accent500
                  : undefined
              }
            />
            <Text style={styles.checkboxLabel}>Active Wallet</Text>
          </View>
          {isCreator && (
            <RadioGroup
              containerStyle={{ marginHorizontal: -5 }}
              layout="row"
              radioButtons={radioButtonsOptions}
              onPress={radioBtnChangeHandler}
              selectedId={radioBtnId}
            />
          )}
          {radioBtnId && (
            <View style={styles.addRemoveContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter user email"
                onChangeText={inputChangeHandler.bind(this, "newUser")}
                value={inputValue.newUser.value}
                placeholderTextColor={GlobalStyles.colors.gray300}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={styles.buttonsContainer}>
                <Button
                  style={styles.button}
                  mode="flat"
                  onPress={() => radioBtnChangeHandler()}
                >
                  Cancel
                </Button>
                <Button style={styles.button} onPress={handleUser}>
                  {radioBtnId === "add" ? "Add User" : "Remove User"}
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
        {!radioBtnId && (
          <View style={styles.buttonsContainer}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>
              Cancel
            </Button>
            {isCreator && (
              <Button style={styles.button} onPress={handleSubmit}>
                Save
              </Button>
            )}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditWallet;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  form: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingTop: 20,
    paddingBottom: 20,
  },
  rowInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  rowInput: { flex: 1 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    marginHorizontal: 8,
  },
  checkbox: { marginRight: 8 },
  checkboxLabel: {
    fontSize: 14,
    color: GlobalStyles.colors.white,
  },
  addRemoveContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  buttonsContainer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 10,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.white,
    width: "100%",
  },
});
