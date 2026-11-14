import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

// A tappable field that opens the native date picker. `value` is a Date (or null),
// `onChange` receives the selected Date.
const DatePickerInput = ({ label, value, onChange, invalid, style }) => {
  const [show, setShow] = useState(false);

  const handleChange = (event, selectedDate) => {
    if (Platform.OS !== "ios") {
      setShow(false);
    }
    if (event.type === "set" && selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, invalid && styles.invalidLabel]}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => setShow(true)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.field, invalid && styles.invalidField]}>
          <Text style={styles.valueText}>
            {value ? getFormattedDate(value) : "Select date"}
          </Text>
        </View>
      </Pressable>
      {show && (
        <DateTimePicker
          value={value instanceof Date ? value : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
          maximumDate={new Date(2100, 11, 31)}
        />
      )}
      {Platform.OS === "ios" && show && (
        <Pressable onPress={() => setShow(false)}>
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      )}
    </View>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.white,
    marginBottom: 4,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  field: {
    backgroundColor: GlobalStyles.colors.primary800,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  invalidField: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error500,
  },
  valueText: {
    fontSize: 18,
    color: GlobalStyles.colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
  doneText: {
    color: GlobalStyles.colors.accent400,
    textAlign: "right",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
});
