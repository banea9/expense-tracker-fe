import { Pressable, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: GlobalStyles.colors.accent500,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.accent500,
    borderRadius: 14,
  },
  flat: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  text: {
    color: GlobalStyles.colors.white,
    textAlign: "center",
    fontWeight: "600",
  },
  flatText: {
    color: GlobalStyles.colors.accent400,
  },
  pressed: {
    opacity: 0.75,
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
