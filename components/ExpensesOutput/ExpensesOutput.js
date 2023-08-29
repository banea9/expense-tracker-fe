import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackText: {
    marginTop: 32,
    color: GlobalStyles.colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});

const ExpensesOutput = ({ expenses, periodName, fallbackText }) => {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.rootContainer}>
      <ExpensesSummary periodName={periodName} expenses={expenses} />
      {content}
    </View>
  );
};

export default ExpensesOutput;
