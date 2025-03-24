import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  feathericonName: keyof typeof Feather.glyphMap;
};

type FeatherDesignIconNames = "user" | "user-plus" | "settings" | "plus";
export default function LinksNavigations({ feathericonName }: Props) {
  return (
    <View style={styles.Icon}>
      <Feather size={35} name={feathericonName} color={"#D8DEE9"} />
    </View>
  );
}

const styles = StyleSheet.create({
  Icon: {
    backgroundColor: "#2E3440",
    width: 58,
    height: 58,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 5,
  },
});
