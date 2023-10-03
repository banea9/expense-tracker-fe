import { View, Text, StyleSheet, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../../components/UI/Button";
import { useState } from "react";
import { getFormattedDate } from "../../util/date";
import { Dropdown } from "react-native-element-dropdown";
import { categories } from "../../util/constants";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
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
    marginTop: 20,
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: GlobalStyles.colors.primary400,
    paddingHorizontal: 8,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  placeholderStyle: {
    fontSize: 16,
    color: GlobalStyles.colors.white,
  },
  invalidDropdown: {
    borderColor: GlobalStyles.colors.error500,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: GlobalStyles.colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitBtnLabel,
  defaultExpense,
}) => {
  const user = useSelector((state) => state.authState);
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultExpense ? defaultExpense?.amount.toString() : "",
      isValid: true,
    },
    lastModified: {
      value: defaultExpense
        ? getFormattedDate(defaultExpense?.lastModified)
        : "",
      isValid: true,
    },
    description: {
      value: defaultExpense ? defaultExpense?.description : "",
      isValid: true,
    },
    category: {
      value: defaultExpense ? defaultExpense?.category : "",
      isValid: true,
    },
    subcategory: {
      value: defaultExpense ? defaultExpense?.subcategory : "",
      isValid: true,
    },
  });

  const selectedCategory = categories.find(
    (el) => el.value === inputValue.category.value?.toLowerCase()
  );
  const [subcategories, setSubcategories] = useState(
    selectedCategory ? selectedCategory.subcategories : []
  );
  const inputChangeHandler = (inputIdentifier, value) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value, isValid: true },
      };
    });
  };

  const handleDropdownSelection = async (name, value, subcategories) => {
    await inputChangeHandler(name, value);
    if (subcategories) setSubcategories(subcategories);
  };

  const handleSubmit = () => {
    const expenseData = {
      amount: +inputValue.amount?.value,
      lastModified: new Date(inputValue.lastModified?.value),
      description: inputValue.description?.value,
      category: inputValue.category?.value,
      subcategory: inputValue.subcategory?.value,
      wallet: user.activeWallet,
    };

    const amountIsValid =
      !isNaN(expenseData?.amount) && expenseData?.amount > 0;
    const descriptionIsValid = expenseData.description?.trim().length > 0;
    const lastModifiedIsValid =
      expenseData.lastModified.toString() !== "Invalid Date";
    const categoryIsValid = !!expenseData.category;
    const subcategoryIsValid = !!expenseData.subcategory;
    if (
      !amountIsValid ||
      !descriptionIsValid ||
      !lastModifiedIsValid ||
      !categoryIsValid ||
      !subcategoryIsValid
    ) {
      Alert.alert("Invalid input", "Please check you input values");
      setInputValue((prevState) => {
        return {
          amount: { value: prevState.amount?.value, isValid: amountIsValid },
          lastModified: {
            value: prevState.lastModified?.value,
            isValid: lastModifiedIsValid,
          },
          description: {
            value: prevState.description?.value,
            isValid: descriptionIsValid,
          },
          category: {
            value: prevState.category?.value,
            isValid: categoryIsValid,
          },
          subcategory: {
            value: prevState.subcategory?.value,
            isValid: subcategoryIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid = () =>
    !inputValue.amount.isValid ||
    !inputValue.lastModified.isValid ||
    !inputValue.description.isValid;

  return (
    <View style={styles.form}>
      <View style={styles.rowInputContainer}>
        <Input
          style={styles.rowInput}
          invalid={!inputValue.amount.isValid}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount?.value,
          }}
        />
        <Input
          style={styles.rowInput}
          invalid={!inputValue.lastModified.isValid}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "lastModified"),
            value: inputValue.lastModified?.value,
          }}
        />
      </View>
      <Input
        invalid={!inputValue.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description?.value,
        }}
      />
      <Dropdown
        style={[
          styles.dropdown,
          !inputValue.category?.isValid && styles.invalidDropdown,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        searchPlaceholder="Search categories..."
        placeholder="Select category"
        labelField="label"
        valueField="value"
        data={categories}
        search
        onChange={(item) =>
          handleDropdownSelection("category", item.value, item.subcategories)
        }
        maxHeight={300}
        value={inputValue.category?.value.toLowerCase()}
      />
      {subcategories.length > 0 && (
        <Dropdown
          style={[
            styles.dropdown,
            !inputValue.subcategory?.isValid && styles.invalidDropdown,
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          searchPlaceholder="Search subcategories..."
          placeholder="Select subcategory"
          labelField="label"
          valueField="value"
          data={subcategories}
          search
          onChange={(item) =>
            handleDropdownSelection("subcategory", item.value)
          }
          maxHeight={300}
          value={inputValue.subcategory?.value.toLowerCase()}
        />
      )}
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
