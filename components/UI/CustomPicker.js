import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  pickerContainer: {
    margin: 4,
  },
  pickerLabel: {
    fontSize: 12,
    color: GlobalStyles.colors.white,
    marginBottom: 4,
  },
  picker: {
    backgroundColor: GlobalStyles.colors.primary800,
    color: GlobalStyles.colors.white,
  },
});

const CustomPicker = ({
  options,
  children,
  category,
  setCategory,
  subcategory,
  setSubcategory,
}) => {

  return (
    <View style={styles.pickerContainer}>
      <View>
        <Text style={styles.pickerLabel}>{children}</Text>
        <Picker
          style={styles.picker}
          selectedValue={children === "Category" ? category : subcategory}
          onValueChange={(value) =>
            children === "Category" ? setCategory(value) : setSubcategory(value)
          }
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
