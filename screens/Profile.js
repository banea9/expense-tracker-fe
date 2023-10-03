import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../constants/styles";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  textContainer: {
    flexDirection: "row",
  },
  textLabel: {
    color: GlobalStyles.colors.primary400,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: GlobalStyles.colors.white,
    fontSize: 14,
  },
});

const Profile = () => {
  const user = useSelector((state) => state.authState);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>Username: </Text>
        <Text style={styles.text}>{user.username}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>Email: </Text>
        <Text style={styles.text}>{user.email}</Text>
      </View>
    </View>
  );
};

export default Profile;
