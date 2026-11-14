import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({
  options,
  children,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  invalid,
}) => {
  const isCategory = children === "Category";
  const selectedValue = isCategory ? category : subcategory;
  const onValueChange = (value) =>
    isCategory ? setCategory(value) : setSubcategory(value);

  return (
    <View style={styles.pickerContainer}>
      <Text style={[styles.pickerLabel, invalid && styles.invalidLabel]}>
        {children}
      </Text>
      <View style={[styles.pickerWrapper, invalid && styles.invalidWrapper]}>
        <Picker
          style={styles.picker}
          dropdownIconColor={GlobalStyles.colors.white}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          <Picker.Item label={`Select ${children}`} value="" />
          {options?.map((o) => (
            <Picker.Item key={o.value} label={o.label} value={o.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  pickerContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  pickerLabel: {
    fontSize: 12,
    color: GlobalStyles.colors.white,
    marginBottom: 4,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  pickerWrapper: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 6,
    overflow: "hidden",
  },
  invalidWrapper: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error500,
  },
  picker: {
    color: GlobalStyles.colors.white,
  },
});
