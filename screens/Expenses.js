import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import RecentExpenses from "./RecentExpenses";
import AllExpenses from "./AllExpenses";
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  btnContiner: {
    flex: 1,
  },
});

const Expenses = () => {
  const [areRecentExpensesShowed, setAreRecentExpensesShowed] = useState(true);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonsContainer}>
        <View style={styles.btnContiner}>
          <Button
            onPress={() => setAreRecentExpensesShowed(true)}
            mode={!areRecentExpensesShowed && "flat"}
          >
            Recent Expenses
          </Button>
        </View>
        <View style={styles.btnContiner}>
          <Button
            onPress={() => setAreRecentExpensesShowed(false)}
            mode={areRecentExpensesShowed && "flat"}
          >
            All Expenses
          </Button>
        </View>
      </View>
      {areRecentExpensesShowed ? <RecentExpenses /> : <AllExpenses />}
    </View>
  );
};

export default Expenses;
