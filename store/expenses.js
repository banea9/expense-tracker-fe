import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    // Expects an already-normalized array (newest first), as returned by the http layer.
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.unshift(action.payload);
    },
    deleteExpense: (state, action) => {
      const id = action.payload.id;
      state.expenses = state.expenses.filter((expense) => expense.id !== id);
    },
    updateExpense: (state, action) => {
      const id = action.payload.id;
      const index = state.expenses.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.expenses[index] = {
          ...state.expenses[index],
          ...action.payload.expense,
        };
      }
    },
  },
});

export const setExpenses = expensesSlice.actions.setExpenses;
export const addExpense = expensesSlice.actions.addExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;

export default expensesSlice.reducer;
