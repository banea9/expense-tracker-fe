import { View, Text, StyleSheet, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../../components/UI/Button";
import { useState } from "react";
import { getFormattedDate } from "../../util/date";

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
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
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorMsg: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    marginVertical: 8,
  },
});

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitBtnLabel,
  defaultExpense,
}) => {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultExpense ? defaultExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultExpense ? getFormattedDate(defaultExpense.date) : "",
      isValid: true,
    },
    description: {
      value: defaultExpense ? defaultExpense.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, value) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value, isValid: true },
      };
    });
  };

  const handleSubmit = () => {
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };

    const amountIsValid =
      !isNaN(expenseData?.amount) && expenseData?.amount > 0;
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";

    if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
      //   Alert.alert("Invalid input", "Please check you input values");
      setInputValue((prevState) => {
        return {
          amount: { value: prevState.amount.value, isValid: amountIsValid },
          date: { value: prevState.date.value, isValid: dateIsValid },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid = () =>
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.rowInputContainer}>
        <Input
          style={styles.rowInput}
          invalid={!inputValue.amount.isValid}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          invalid={!inputValue.date.isValid}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date.value,
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

export default ExpenseForm;
