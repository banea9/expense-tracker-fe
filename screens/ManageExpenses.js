import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deletеBtn: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
  },
});

const ManageExpenses = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const expenseId = route.params?.expenseId;
  const dispatch = useDispatch();

  const selectedExpense = useSelector((state) =>
    state.expensesState.expenses.find((el) => el.id === expenseId)
  );

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setLoading(true);
    try {
      if (expenseId) {
        dispatch(
          updateExpense({
            id: expenseId,
            expense: expenseData,
          })
        );
        await httpUpdateExpense(expenseId, expenseData);
      } else {
        const id = await httpStoreExpense(expenseData);
        dispatch(addExpense({ ...expenseData, id }));
      }
      navigation.goBack();
    } catch (err) {
      setError("Could not save expense. Please try again later");
      setLoading(false)
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
      dispatch(deleteExpense({ id: expenseId }));
      await httpDeleteExpense(expenseId);
      navigation.goBack();
    } catch (err) {
      setError("Could not delete expense. Please try again later");
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
        <View style={styles.deletеBtn}>
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
