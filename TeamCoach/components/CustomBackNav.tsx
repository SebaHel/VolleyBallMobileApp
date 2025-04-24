import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CustomBackNav() {
  const router = useRouter();
  return (
    <View style={styles.Icon}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign
          type="antDesign"
          size={45}
          color={"#D8DEE9"}
          name={"arrowleft"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Icon: {
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
