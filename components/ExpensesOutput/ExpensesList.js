import { View, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  const renderExpenses = (itemData) => {
    return <ExpenseItem expense={itemData.item} />;
  };

  return (
    <View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={renderExpenses}
      />
    </View>
  );
};

export default ExpensesList;
