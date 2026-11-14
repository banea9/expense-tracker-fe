import { useLayoutEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyles } from "../constants/styles";
import { deleteExpense, updateExpense, addExpense } from "../store/expenses";
import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  httpDeleteExpense,
  httpStoreExpense,
  httpUpdateExpense,
} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenses = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const expenseId = route.params?.expenseId;
  const dispatch = useDispatch();
  const { token, activeWallet } = useSelector((state) => state.authState);

  const selectedExpense = useSelector((state) =>
    state.expensesState.expenses.find((el) => el.id === expenseId)
  );

  const cancelHandler = () => navigation.goBack();

  const confirmHandler = async (expenseData) => {
    if (!expenseId && !activeWallet) {
      Alert.alert(
        "No active wallet",
        "Please select an active wallet before adding an expense."
      );
      return;
    }

    setLoading(true);
    try {
      if (expenseId) {
        const updated = await httpUpdateExpense(expenseId, expenseData, token);
        dispatch(updateExpense({ id: expenseId, expense: updated }));
      } else {
        const created = await httpStoreExpense(expenseData, activeWallet, token);
        dispatch(addExpense(created));
      }
      navigation.goBack();
    } catch (err) {
      setError("Could not save expense. Please try again later.");
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Add Expense",
    });
  }, [expenseId, navigation]);

  const deleteExpenseHandler = async () => {
    setLoading(true);
    try {
      await httpDeleteExpense(expenseId, token);
      dispatch(deleteExpense({ id: expenseId }));
      navigation.goBack();
    } catch (err) {
      setError("Could not delete expense. Please try again later.");
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
    <View style={styles.rootContainer}>
      <ExpenseForm
        submitBtnLabel={expenseId ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultExpense={selectedExpense}
      />
      {expenseId && (
        <View style={styles.deleteBtn}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteBtn: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
  },
});
