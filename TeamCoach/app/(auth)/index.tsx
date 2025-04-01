import { View, StyleSheet, Button, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { AuthButton } from "@/components/authButton";

export default function home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../static/volleyball.png")}
        style={styles.icon}
      />
      <Text style={styles.MainText}>Volleyball Coach</Text>
      <Text style={styles.secondaryText}>
        Managing team is now easy with satisfied results
      </Text>
      <AuthButton
        text={"Get Started For Free"}
        onPress={() => router.replace("/signIn")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#21252C",
  },

  icon: {
    width: 242,
    height: 242,
    marginBottom: 134,
  },

  MainText: {
    color: "#D8DEE9",
    fontSize: 36,
  },
  secondaryText: {
    color: "#AEB6C3",
    fontSize: 20,
    width: 280,
    flexWrap: "wrap",
    textAlign: "center",
  },
  button: {
    width: 372,
    height: 70,
  },
});
