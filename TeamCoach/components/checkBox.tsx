import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface checkBoxProp {
  checked: boolean;
  onToggle: () => void;
  label?: string;
}

export default function CheckBox({ checked, onToggle, label }: checkBoxProp) {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <AntDesign name="check" size={12} color="white" />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 200,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#F9A826",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#F9A826",
  },
  label: {
    fontSize: 14,
    color: "#AEB6C3",
  },
});
