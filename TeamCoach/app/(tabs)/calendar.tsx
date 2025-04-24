import { View, StyleSheet } from "react-native";

import LinksNavigations from "@/components/LinksNavigations";

export default function calendar() {
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
