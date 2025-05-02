import { View, Text, StyleSheet } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

type IconType = "feather" | "antDesign" | "materialIcons";

type Props = {
  iconName: string;
  type: IconType;
  size: number;
};

export default function LinksNavigations({ iconName, type, size }: Props) {
  const color = "#D8DEE9";

  const renderIcon = () => {
    switch (type) {
      case "feather":
        return (
          <Feather
            size={size}
            name={iconName as keyof typeof Feather.glyphMap}
            color={color}
          />
        );
      case "antDesign":
        return (
          <AntDesign
            size={size}
            name={iconName as keyof typeof AntDesign.glyphMap}
            color={color}
          />
        );
      case "materialIcons":
        return (
          <MaterialIcons
            size={size}
            name={iconName as keyof typeof MaterialIcons.glyphMap}
            color={color}
          />
        );
      default:
        return null;
    }
  };
  return <View style={styles.Icon}>{renderIcon()}</View>;
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
