import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

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
  name: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  //   amountContainer: {
  //     paddingHorizontal: 4,
  //     paddingVertical: 12,
  //     backgroundColor: GlobalStyles.colors.white,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     minWidth: 80,
  //   },
  //   amountText: {
  //     color: GlobalStyles.colors.primary600,
  //     fontWeight: "bold",
  //   },
  pressed: {
    opacity: 0.75,
  },
});

const WalletItem = ({ wallet }) => {
  const navigation = useNavigation();
  const walletPressHandler = () => {

    // navigation.navigate("ManageExpense", {
    //   expenseId: wallet.id,
    // });
  };

  const { description, name, creatorEmail, users, _id } = wallet;
  console.log(wallet);
  return (
    <Pressable
      onPress={() => console.log('pressed wallet ' + wallet._id)}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.rootContainer}>
        <View>
          <Text style={[styles.textBase, styles.name]}>{name}</Text>
          <Text style={styles.textBase}>{creatorEmail}</Text>
        </View>
        <View>
          <Text style={[styles.textBase, styles.name]}>{description}</Text>
        </View>
        <View>
          <Text style={[styles.textBase, styles.name]}>
            Wallet users: {users.join(", ")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default WalletItem;
