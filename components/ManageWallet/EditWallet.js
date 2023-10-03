import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
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
import { emailRegex } from "../../util/constants";
import { radioButtonsOptions } from "../../util/constants";
import Input from "../ManageExpense/Input";
import Button from "../../components/UI/Button";
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverlay";
import RadioGroup from "react-native-radio-buttons-group";
import { selectWalletUsers } from "../../store/selectors/selector";
import Checkbox from "expo-checkbox";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingTop: 20,
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
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    margin: 5,
  },
  checkbox: {
    marginRight: 5,
  },
  checkboxLabel: {
    fontSize: 14,
    color: GlobalStyles.colors.white,
  },
  addRemoveContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    marginTop: 10,
    marginBottom: 30,
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
  input: {
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.white,
    width: "100%",
    marginHorizontal: 10,
  },
});

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
    isActive: { value: user.activeWallet === _id || false, isValid: true },
    newUser: { value: "", isValid: true },
  });

  const [radioBtnId, setRadioBtnId] = useState(0);

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

  const resetUserField = () => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        newUser: {
          value: "",
          isValid: true,
        },
      };
    });
  };

  const setActiveWallet = async (value) => {
    inputChangeHandler("isActive", value);
    try {
      const res = await httpSetActiveWallet(_id, user.email, user.token);
      dispatch(setUserActiveWallet({ walletId: res._id }));
    } catch (e) {
      setError(e.message);
    }
  };

  const radioBtnChangeHandler = (value = 0) => {
    setRadioBtnId(value);
    resetUserField();
  };

  const handleUser = async () => {
    const emailIsValid = emailRegex.test(inputValue.newUser.value);
    if (!emailIsValid) {
      Alert.alert("Invalid input", "Please enter valid email.");
      setInputValue((prevState) => {
        return {
          name: {
            value: prevState.name.value,
            isValid: prevState.name.isValid,
          },
          creatorEmail: {
            value: prevState.creatorEmail.value,
            isValid: prevState.creatorEmail.isValid,
          },
          isActive: {
            value: prevState.isActive.value,
            isValid: prevState.isActive.isValid,
          },
          description: {
            value: prevState.description.value,
            isValid: prevState.description.isValid,
          },
          newUser: {
            value: prevState.newUser.value,
            isValid: emailIsValid,
          },
        };
      });
      return;
    }

    setLoading(true);
    const walletData = {
      id: _id,
      userEmail: inputValue.newUser.value,
    };
    try {
      if (radioBtnId === 1) {
        const res = await httpAddUserToWallet(walletData, user.token);
        if (res.status === 400) {
          throw new Error(res.message);
        }
        dispatch(manipulateWalletUser({ wallet: res }));
        radioBtnChangeHandler();
      } else {
        const res = await httpRemoveUserFromWallet(walletData, user.token);
        if (res.status === 400) {
          throw new Error(res.message);
        }
        dispatch(manipulateWalletUser({ wallet: res }));
        radioBtnChangeHandler();
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const nameIsValid = inputValue?.name.value.trim().length > 3;
    const descriptionIsValid = inputValue?.description.value.trim().length > 10;
    if (!nameIsValid || !descriptionIsValid) {
      Alert.alert(
        "Invalid input",
        "Name should be longer then 3 characters and description should be more then 10 characters."
      );
      setInputValue((prevState) => {
        return {
          name: { value: prevState.name.value, isValid: nameIsValid },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
          newUser: {
            value: prevState.newUser.value,
            isValid: emailIsValid,
          },
        };
      });
      return;
    }

    setLoading(true);
    const walletData = {
      name: inputValue.name.value,
      description: inputValue.description.value,
      isActive: inputValue.isActive.value,
    };
    try {
      const id = await httpUpdateWallet(walletData, user.token);
      dispatch(updateWallet({ ...walletData, id }));
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
    return <LoadingOverlay />;
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <View style={styles.form}>
        <ScrollView>
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
                  ? GlobalStyles.colors.primary400
                  : undefined
              }
            />
            <Text style={styles.checkboxLabel}>Active Wallet</Text>
          </View>
          <RadioGroup
            containerStyle={{ marginHorizontal: -5 }}
            layout="row"
            color={GlobalStyles.colors.primary400}
            radioButtons={radioButtonsOptions}
            onPress={radioBtnChangeHandler}
            selectedId={radioBtnId}
          />
          {radioBtnId !== 0 && (
            <View style={styles.addRemoveContainer}>
              <TextInput
                style={styles.input}
                invalid={!inputValue.newUser.isValid}
                placeholder="Enter user email"
                onChangeText={inputChangeHandler.bind(this, "newUser")}
                value={inputValue.newUser.value}
                placeholderTextColor={GlobalStyles.colors.gray300}
              />
              <View style={styles.buttonsContainer}>
                <Button
                  style={styles.button}
                  mode="flat"
                  onPress={() => radioBtnChangeHandler(0)}
                >
                  Cancel
                </Button>
                <Button style={styles.button} onPress={handleUser}>
                  {radioBtnId === 1 ? "Add User" : "Remove User"}
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={{ flex: 1 }} />
        {radioBtnId === 0 && (
          <View style={styles.buttonsContainer}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>
              Cancel
            </Button>
            <Button style={styles.button} onPress={handleSubmit}>
              Save
            </Button>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditWallet;
