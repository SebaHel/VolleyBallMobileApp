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
        <LinksNavigations type="feather" iconName={"user"} />
        <Text>Groups</Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/groups/addGroup")}
        >
          <LinksNavigations type="antDesign" iconName={"addusergroup"} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={state?.groups ?? []}
        keyExtractor={(item) => item.group_id}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.name}</Text>
          </View>
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
  },
  groupItem: {
    backgroundColor: "#2E333D",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 10,
  },
  groupName: {
    color: "white",
    fontSize: 16,
  },
});
