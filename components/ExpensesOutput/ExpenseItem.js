import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const capitalize = (s) =>
  typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : s;

const ExpenseItem = ({ expense }) => {
  const navigation = useNavigation();
  const { id, category, subcategory, description, date, amount } = expense;

  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", { expenseId: id });
  };

  const title = [category, subcategory]
    .filter(Boolean)
    .map(capitalize)
    .join(" · ");

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.rootContainer}>
        <View style={styles.details}>
          <Text style={[styles.textBase, styles.title]} numberOfLines={1}>
            {title || "Expense"}
          </Text>
          {!!description && (
            <Text style={styles.textBase} numberOfLines={1}>
              {description}
            </Text>
          )}
          <Text style={styles.dateText}>{getFormattedDate(new Date(date))}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{Number(amount).toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
    shadowColor: GlobalStyles.colors.black,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  details: {
    flex: 1,
    marginRight: 12,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  dateText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
    marginTop: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: GlobalStyles.colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    minWidth: 84,
  },
  amountText: {
    color: GlobalStyles.colors.primary600,
    fontWeight: "bold",
    fontSize: 15,
  },
  pressed: {
    opacity: 0.75,
  },
});
