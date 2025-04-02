import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface AuthButtonProps {
  text: string;
  onPress?: () => void;
}

export function AuthButton({ text, onPress }: AuthButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
      <AntDesign name="right" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 372,
    height: 70,
    backgroundColor: "#F9A826",
    borderRadius: 25,
    marginTop: 57,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 28,
  },
  icon: {
    position: "absolute",
    left: 310,
    top: 26,
    fontSize: 25,
    width: 28,
    height: 28,
    color: "black",
    marginLeft: 20,
  },
});
