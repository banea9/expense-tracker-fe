import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyles } from "../constants/styles";
import { deleteExpense, updateExpense, addExpense } from "../store/expenses";
import DatePicker from "react-native-date-picker";
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

  const userState = useSelector((state) => state.authState);
  const selectedExpense = useSelector((state) =>
    state.expensesState.expenses.find((el) => el._id === expenseId)
  );

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setLoading(true);

    try {
      if (expenseId) {
        const res = await httpUpdateExpense(
          {
            id: expenseId,
            ...expenseData,
          },
          userState.token
        );
        console.log("response: ", res);
        dispatch(
          updateExpense({
            id: expenseId,
            expense: {
              id: expenseId,
              ...expenseData,
            },
          })
        );
      } else {
        const res = await httpStoreExpense(expenseData, userState.token);
        const {
          _id,
          amount,
          category,
          description,
          subcategory,
          lastModified,
          user,
          wallet,
        } = res;
        const expense = {
          _id,
          amount,
          category,
          description,
          subcategory,
          lastModified,
          user: user._id,
          wallet: wallet._id,
        };
        dispatch(addExpense(expense));
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setError("Could not save expense. Please try again later");
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
      const res = await httpDeleteExpense(expenseId, userState.token);
      dispatch(deleteExpense({ id: res._id }));
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
