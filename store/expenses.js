import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload.reverse();
    },
    addExpense: (state, action) => {
      const { description, amount, lastModified, _id, category, subcategory, user, wallet } =
        action.payload;
      state.expenses.unshift({
        _id,
        description,
        amount,
        lastModified,
        category,
        subcategory,
        user,
        wallet
      });
    },
    deleteExpense: (state, action) => {
      const id = action.payload.id;
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === id
      );
      state.expenses.splice(updatableExpenseIndex, 1);
    },
    updateExpense: (state, action) => {
      const id = action.payload.id;
      const findedExpenseIndex = state.expenses.findIndex((e) => e.id === id);
      state.expenses[findedExpenseIndex] = {
        ...state.expenses[findedExpenseIndex],
        ...action.payload.expense,
      };
    },
  },
});

export const setExpenses = expensesSlice.actions.setExpenses;
export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;

export default expensesSlice.reducer;
