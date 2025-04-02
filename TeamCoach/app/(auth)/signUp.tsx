import { View, Button, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function signUp() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../static/volleyball.png")}
        style={styles.icon}
      />
      <Text>Sign In Form</Text>
      <Button title="Go to SignIn" onPress={() => router.replace("/signIn")} />
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
});
