import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomBackNav from "@/components/CustomBackNav";
import { useState, useContext } from "react";
import { AuthButton } from "@/components/authButton";
import { Context as GroupContext } from "@/Context/groupContext";

const colors = [
  "#D8DEE9",
  "#F4E1D2",
  "#FFE8D6",
  "#FFF3E0",
  "#E0F7FA",
  "#E0F2F1",
];

export default function calendar() {
  const [groupName, setGroupName] = useState("");
  const { state, createGroup } = useContext(GroupContext);

  const [selectedColor, setSelectedColor] = useState("#E63946");

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

      <Text style={styles.label}>Add Group</Text>

      <View>
        <TextInput
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Type Your Title"
          placeholderTextColor="#D8DEE970"
          autoCapitalize="none"
          maxLength={32}
          style={styles.groupNameinput}
        />

        <Text style={{ color: "white" }}>Chose Background color:</Text>
        <FlatList
          horizontal
          data={colors}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedColor(item)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: item,
                  margin: 10,
                  borderWidth: selectedColor === item ? 2 : 0,
                  borderColor: "#fff",
                }}
              />
            </TouchableOpacity>
          )}
        />

        <AuthButton
          text="Create"
          onPress={() => createGroup({ groupName, selectedColor })}
        />
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
  groupNameinput: {
    width: 372,
    height: 75,
    borderColor: "#3B4252",
    borderWidth: 1,
    borderRadius: 15,
    opacity: 80,
    marginBottom: 25,
    padding: 20,
    color: "#D8DEE990",
  },
  label: {
    fontSize: 32,
    color: "#D8DEE990",
  },
});
