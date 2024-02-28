import { useMemo } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { categories } from "../../util/constants";

const styles = StyleSheet.create({
  rootContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary800,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.white,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 4,
    paddingVertical: 12,
    backgroundColor: GlobalStyles.colors.primary400,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  amountText: {
    color: GlobalStyles.colors.white,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

const ExpenseItem = ({ expense }) => {
  const userState = useSelector((state) => state.authState);
  const navigation = useNavigation();
  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: expense._id,
    });
  };

  const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  const { category, subcategory, lastModified, amount } = expense;

  const subcategoryLabel = useMemo(() => {
    const allSubcategories = categories.map(
      (category) => category.subcategories
    );
    const foundedSubcategory = allSubcategories
    .flat()
    .find((sub) => sub['value'] === subcategory);

    return foundedSubcategory.label;
  }, [subcategory]);

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.rootContainer}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {capitalizeWord(category)}, {subcategoryLabel}
          </Text>
          <Text style={styles.textBase}>
            {getFormattedDate(lastModified)}, by {userState.username}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{Number(amount).toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;
