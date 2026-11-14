import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { setExpenses } from "../store/expenses";
import { httpFetchAllExpenses } from "../util/http";

const AllExpenses = () => {
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

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No registered expenses found."
    />
  );
};

export default AllExpenses;
