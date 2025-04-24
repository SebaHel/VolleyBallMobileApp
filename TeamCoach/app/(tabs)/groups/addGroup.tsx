import { View, StyleSheet, Text, TextInput } from "react-native";
import CustomBackNav from "@/components/CustomBackNav";
import { useState } from "react";
import { AuthButton } from "@/components/authButton";
export default function calendar() {
  const [name, setName] = useState("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#21252C",
      }}
    >
      <View style={styles.IconContainer}>
        <CustomBackNav />
      </View>

      <Text>Add Group</Text>

      <View>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Type Your Title"
          placeholderTextColor="#D8DEE970"
          autoCapitalize="none"
          maxLength={32}
        />
        <AuthButton text="Create" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 45,
    margin: 25,
  },
});
