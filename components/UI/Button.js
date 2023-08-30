import { Pressable, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary400,
  },
  flat: {
    backgroundColor: "transparent",
  },
  text: {
    color: GlobalStyles.colors.white,
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});

const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.buttonContainer, mode === "flat" && styles.flat]}>
          <Text style={[styles.text, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;
