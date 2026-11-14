import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { categories } from "../../util/constants";
import Input from "./Input";
import Button from "../../components/UI/Button";
import CustomPicker from "../UI/CustomPicker";
import DatePickerInput from "../UI/DatePickerInput";

const ExpenseForm = ({ onCancel, onSubmit, submitBtnLabel, defaultExpense }) => {
  const [category, setCategory] = useState(defaultExpense?.category ?? "");
  const [subcategory, setSubcategory] = useState(
    defaultExpense?.subcategory ?? ""
  );
  const [amount, setAmount] = useState(
    defaultExpense ? defaultExpense.amount.toString() : ""
  );
  const [date, setDate] = useState(
    defaultExpense?.date ? new Date(defaultExpense.date) : new Date()
  );
  const [description, setDescription] = useState(
    defaultExpense?.description ?? ""
  );
  const [errors, setErrors] = useState({});

  const subcategoryOptions =
    categories.find((c) => c.value === category)?.subcategories ?? [];

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory(""); // reset subcategory when category changes
  };

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    const nextErrors = {
      category: !category,
      subcategory: !subcategory,
      amount: isNaN(parsedAmount) || parsedAmount <= 0,
      date: !(date instanceof Date) || isNaN(date.getTime()),
    };
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      Alert.alert("Invalid input", "Please check the values you entered.");
      return;
    }

    onSubmit({
      category,
      subcategory,
      amount: parsedAmount,
      description: description.trim(),
      date,
    });
  };

  return (
    <ScrollView
      style={styles.form}
      contentContainerStyle={styles.formContent}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Your Expense</Text>

      <CustomPicker
        options={categories}
        category={category}
        setCategory={handleCategoryChange}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        invalid={errors.category}
      >
        Category
      </CustomPicker>

      <CustomPicker
        options={subcategoryOptions}
        category={category}
        setCategory={handleCategoryChange}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
        invalid={errors.subcategory}
      >
        Subcategory
      </CustomPicker>

      <View style={styles.rowInputContainer}>
        <Input
          style={styles.rowInput}
          invalid={errors.amount}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: setAmount,
            value: amount,
          }}
        />
        <DatePickerInput
          style={styles.rowInput}
          label="Date"
          value={date}
          onChange={setDate}
          invalid={errors.date}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: setDescription,
          value: description,
        }}
      />

      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleSubmit}>
          {submitBtnLabel}
        </Button>
      </View>
    </ScrollView>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 24,
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
    alignItems: "flex-start",
    width: "100%",
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
