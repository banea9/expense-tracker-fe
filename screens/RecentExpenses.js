import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { setExpenses } from "../store/expenses";
import { getDateMinusDays } from "../util/date";
import { httpFetchExpense } from "../util/http";

const RecentExpenses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const expenses = useSelector((state) => state.expensesState.expenses);
  const user = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    const getExenses = async () => {
      try {
        const expenses = await httpFetchExpense(user.token);
        dispatch(setExpenses(expenses));
      } catch (err) {
        setError("Couldn't fetch expenses!");
      }
      setLoading(false);
    };

    getExenses();
  }, []);

  if (error && !loading) {
    return <ErrorOverlay message={error} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenses?.filter((e) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return e.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 days"
      fallbackText="No expenses for last 7 days"
    />
  );
};

export default RecentExpenses;
