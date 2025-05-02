import React, { useCallback, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Context as GroupContext } from "@/Context/groupContext";
import LinksNavigations from "@/components/LinksNavigations";
import { useFocusEffect, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
export default function groups() {
  const { state, fetchGroups } = useContext(GroupContext);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#21252C",
      }}
    >
      <View style={styles.IconContainer}>
        <LinksNavigations type="feather" iconName={"user"} size={35} />
        <Text style={styles.Label}>Groups</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/groups/addGroup")}
        >
          <LinksNavigations
            type="antDesign"
            iconName={"addusergroup"}
            size={35}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={state?.groups ?? []}
        keyExtractor={(item) => item.group_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/(tabs)/groups/[id]`,
                params: { id: item.group_id },
              })
            }
          >
            <View
              style={[
                styles.groupItem,
                { backgroundColor: item.color || "#2E333D" },
              ]}
            >
              <Text style={styles.groupName}>{item.name}</Text>
              <Feather
                name={"chevron-right"}
                size={24}
                color={"#AEB6C3"}
                style={{ fontWeight: 600 }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 15,
  },
  Label: {
    color: "#D8DEE9",
    fontSize: 32,
    left: -55,
    top: 6,
  },
  groupItem: {
    flexDirection: "row",
    width: "90%",
    height: 148,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: "5%",
    alignItems: "center",
    justifyContent: "space-between",
    top: "25%",
  },
  groupName: {
    color: "#FF8C42",
    fontSize: 22,
    left: 24,
    fontWeight: 600,
  },
});
