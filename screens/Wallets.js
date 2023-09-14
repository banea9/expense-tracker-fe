import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyles } from "../constants/styles";
import { setWallets } from "../store/wallets";
import { httpFetchWallet } from "../util/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import WalletItem from "../components/WalletsOutput/WalletItem";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallbackText: {
    marginTop: 22,
    color: GlobalStyles.colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});

const Wallets = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const wallets = useSelector((state) => state.walletsState.wallets);
  const user = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  useEffect(() => {
    const getWallets = async () => {
      try {
        const wallets = await httpFetchWallet(user.token);
        dispatch(setWallets(wallets));
        setError(false);
      } catch (err) {
        console.log(err);
        setError("Couldn't fetch wallets!");
      }
      setLoading(false);
    };

    getWallets();
  }, []);

  if (error && !loading) {
    return <ErrorOverlay message={error} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  if (wallets.length === 0) {
    return (
      <Text style={styles.fallbackText}>
        You are not part of any wallet at this moment.
      </Text>
    );
  }

  const renderWallets = (itemData) => {
    return (
      <WalletItem
        wallet={itemData.item}
        key={itemData.item._id}
        activeWalletId={user.activeWallet}
      />
    );
  };

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={wallets}
        keyExtractor={(item) => item.id}
        renderItem={renderWallets}
      />
    </View>
  );
};

export default Wallets;
