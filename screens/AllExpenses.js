import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const AllExpenses = () => {
  const expenses = useSelector((state) => state.expensesState.expenses);
  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No registered expenses found."
    />
  );
};

export default AllExpenses;
