import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import { GlobalStyles } from "../constants/styles";
import { categories } from "../util/constants";
import { getDateMinusDays } from "../util/date";
import { httpFilterExpenses } from "../util/http";
import CustomPicker from "../components/UI/CustomPicker";
import DatePickerInput from "../components/UI/DatePickerInput";
import Button from "../components/UI/Button";
import ExpensesList from "../components/ExpensesOutput/ExpensesList";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const FilterExpenses = () => {
  const { token, activeWallet } = useSelector((state) => state.authState);
  const wallets = useSelector((state) => state.walletsState.wallets);
  const activeWalletObj = wallets.find((w) => w._id === activeWallet);

  const [fromDate, setFromDate] = useState(getDateMinusDays(new Date(), 30));
  const [toDate, setToDate] = useState(new Date());
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [allUsers, setAllUsers] = useState(false);
  const [allWallets, setAllWallets] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const subcategoryOptions =
    categories.find((c) => c.value === category)?.subcategories ?? [];

  const applyFilter = async () => {
    if (!allWallets && !activeWalletObj) {
      Alert.alert(
        "No active wallet",
        "Select an active wallet or enable 'All wallets'."
      );
      return;
    }

    setLoading(true);
    try {
      const filter = {
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        wallet: activeWalletObj ? { name: activeWalletObj.name } : undefined,
        allWallets,
        allUsers,
        category: category || undefined,
        subcategory: subcategory || undefined,
        sortColumn: "lastModified",
        sortOrder,
      };
      const filtered = await httpFilterExpenses(filter, token);
      setResults(filtered);
    } catch (err) {
      Alert.alert(
        "Filter failed",
        err?.response?.data?.message ?? "Could not filter expenses."
      );
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.row}>
        <DatePickerInput
          style={styles.rowItem}
          label="From"
          value={fromDate}
          onChange={setFromDate}
        />
        <DatePickerInput
          style={styles.rowItem}
          label="To"
          value={toDate}
          onChange={setToDate}
        />
      </View>

      <CustomPicker
        options={categories}
        category={category}
        setCategory={(value) => {
          setCategory(value);
          setSubcategory("");
        }}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
      >
        Category
      </CustomPicker>

      <CustomPicker
        options={subcategoryOptions}
        category={category}
        setCategory={setCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
      >
        Subcategory
      </CustomPicker>

      <View style={styles.checkboxRow}>
        <Checkbox
          value={allUsers}
          onValueChange={setAllUsers}
          color={allUsers ? GlobalStyles.colors.accent500 : undefined}
        />
        <Text style={styles.checkboxLabel}>Include all users in the wallet</Text>
      </View>

      <View style={styles.checkboxRow}>
        <Checkbox
          value={allWallets}
          onValueChange={setAllWallets}
          color={allWallets ? GlobalStyles.colors.accent500 : undefined}
        />
        <Text style={styles.checkboxLabel}>Search across all wallets</Text>
      </View>

      <Text style={styles.sectionLabel}>Sort by date</Text>
      <View style={styles.row}>
        <Button
          style={styles.rowItem}
          mode={sortOrder === "desc" ? undefined : "flat"}
          onPress={() => setSortOrder("desc")}
        >
          Newest
        </Button>
        <Button
          style={styles.rowItem}
          mode={sortOrder === "asc" ? undefined : "flat"}
          onPress={() => setSortOrder("asc")}
        >
          Oldest
        </Button>
      </View>

      <Button style={styles.applyBtn} onPress={applyFilter}>
        Apply Filter
      </Button>

      {results && (
        <View style={styles.results}>
          <Text style={styles.resultsLabel}>
            {results.length} result{results.length === 1 ? "" : "s"}
          </Text>
          {results.length > 0 ? (
            <ExpensesList expenses={results} />
          ) : (
            <Text style={styles.empty}>No expenses match this filter.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default FilterExpenses;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 4,
  },
  checkboxLabel: {
    color: GlobalStyles.colors.white,
    marginLeft: 8,
    fontSize: 14,
  },
  sectionLabel: {
    color: GlobalStyles.colors.white,
    fontSize: 12,
    marginTop: 8,
    marginHorizontal: 4,
  },
  applyBtn: {
    marginTop: 16,
    marginHorizontal: 4,
  },
  results: {
    marginTop: 20,
  },
  resultsLabel: {
    color: GlobalStyles.colors.primary100,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  empty: {
    color: GlobalStyles.colors.white,
    textAlign: "center",
    marginTop: 12,
  },
});
