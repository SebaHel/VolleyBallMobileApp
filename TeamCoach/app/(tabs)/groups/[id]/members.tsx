import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Context as GroupContext } from "@/Context/groupContext";
import { View, Text, StyleSheet } from "react-native";
import CustomBackNav from "@/components/CustomBackNav";

interface Group {
  group_id: string;
  name: string;
  color: string | null;
}

interface GroupContextState {
  groups: Group[];
}

export default function GroupMembers() {
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const { state } = useContext(GroupContext);
  const group = state.groups.find((g: Group) => g.group_id === id);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#21252C",
      }}
    >
      <View style={styles.IconContainer}>
        <View>
          <CustomBackNav />
        </View>
        <Text style={styles.groupName}>{group.name}</Text>
      </View>
      <View>
        <Text>{id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 45,
    margin: 25,
  },
  groupName: {
    fontSize: 32,
    color: "#D8DEE9",
  },
});
