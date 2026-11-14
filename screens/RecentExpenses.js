import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { setExpenses } from "../store/expenses";
import { getDateMinusDays } from "../util/date";
import { httpFetchAllExpenses } from "../util/http";

const RecentExpenses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const expenses = useSelector((state) => state.expensesState.expenses);
  const token = useSelector((state) => state.authState.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const fetched = await httpFetchAllExpenses(token);
        dispatch(setExpenses(fetched));
      } catch (err) {
        setError("Couldn't fetch expenses!");
      }
      setLoading(false);
    };
    getExpenses();
  }, [dispatch, token]);

  if (error && !loading) {
    return <ErrorOverlay message={error} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  const date7DaysAgo = getDateMinusDays(new Date(), 7);
  const recentExpenses = expenses?.filter((e) => new Date(e.date) > date7DaysAgo);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 days"
      fallbackText="No expenses for last 7 days"
    />
  );
};

export default RecentExpenses;
