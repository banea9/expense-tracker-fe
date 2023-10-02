import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  rootContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary800,
    alignItems: "flex-start",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  activeWallet: {
    borderColor: GlobalStyles.colors.primary400,
    borderWidth: 5,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textBase: {
    color: GlobalStyles.colors.white,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

const WalletItem = ({ wallet, activeWalletId }) => {
  const navigation = useNavigation();
  const walletPressHandler = () => {
    navigation.navigate("EditWallet", {
      wallet: wallet,
    });
  };
  const { description, name, creatorEmail, users, _id, lastModified } = wallet;
  return (
    <Pressable
      onPress={walletPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View
        style={[
          styles.rootContainer,
          activeWalletId === _id && styles.activeWallet,
        ]}
      >
        <Text style={[styles.textBase, styles.name]}>Name: {name}</Text>
        <Text style={[styles.textBase, styles.name]}>
          Creator: {creatorEmail}
        </Text>

        <Text style={[styles.textBase, styles.name]}>
          Wallet users: {users.map((u) => u.username).join(", ")}
        </Text>

        <Text style={[styles.textBase, styles.name]}>
          Description: {description}
        </Text>
        <Text style={[styles.textBase, styles.name]}>
          Last Modified: {getFormattedDate(new Date(lastModified))}
        </Text>
      </View>
    </Pressable>
  );
};

export default WalletItem;
