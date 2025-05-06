import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { Context as GroupContext } from "@/Context/groupContext";
import CustomBackNav from "@/components/CustomBackNav";
import LinksNavigations from "@/components/LinksNavigations";

interface Group {
  group_id: string;
  name: string;
  color: string | null;
}

interface GroupContextState {
  groups: Group[];
}

export default function GroupDetails() {
  const { id } = useLocalSearchParams();
  const { state } = useContext(GroupContext);
  const router = useRouter();

  const group = state.groups.find((g: Group) => g.group_id === id);

  if (!group) return <Text>Loading...</Text>;

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
      <View style={styles.labels}>
        <Text style={styles.labelText}>Closest Event</Text>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/groups/[id]/members",
              params: { id: id },
            })
          }
        >
          <Text style={styles.labelbutton}>Members</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.EventContainer}>
        <LinksNavigations
          type="materialIcons"
          iconName={"notifications"}
          size={45}
        />
      </View>
      <View
        style={[
          styles.container,
          { backgroundColor: group.color || "#2E333D" },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  labels: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 45,
    margin: 8,
    marginHorizontal: 22,
  },
  labelText: {
    fontSize: 24,
    color: "#D8DEE9",
  },
  labelbutton: {
    fontSize: 16,
    color: "#FF8C42",
  },
  EventContainer: {
    width: 380,
    height: 73,
    backgroundColor: "#2E333D",
    margin: 15,
    borderRadius: 15,
    justifyContent: "center",
    elevation: 3,
  },
});
