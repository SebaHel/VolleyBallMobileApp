import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import LinksNavigations from "@/components/LinksNavigations";
import { useCallback, useContext } from "react";
import { Context as NotificationContext } from "@/Context/notificationContext";
import { useFocusEffect } from "expo-router";

import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function notification() {
  const { state, fetchNotification, deleteNotification } =
    useContext(NotificationContext);

  useFocusEffect(
    useCallback(() => {
      fetchNotification();
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
        <LinksNavigations type="feather" iconName={"settings"} />
      </View>
      <FlatList
        data={state.notifications ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.message}</Text>
            <TouchableOpacity
              onPress={() => deleteNotification({ id: item.id })}
            >
              <EvilIcons name="trash" size={32} color="#FF8C42" />
            </TouchableOpacity>
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
