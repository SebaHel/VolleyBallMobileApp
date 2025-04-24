import { View, Text, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

type IconType = "feather" | "antDesign";

type Props = {
  iconName: string;
  type: IconType;
};

type FeatherDesignIconNames = "user" | "user-plus" | "settings" | "plus";
export default function LinksNavigations({ iconName, type }: Props) {
  return (
    <View style={styles.Icon}>
      {type === "feather" ? (
        <Feather
          size={35}
          name={iconName as keyof typeof Feather.glyphMap}
          color={"#D8DEE9"}
        />
      ) : (
        <AntDesign
          size={35}
          name={iconName as keyof typeof AntDesign.glyphMap}
          color={"#D8DEE9"}
        />
      )}
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
