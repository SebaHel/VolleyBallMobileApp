import { useRouter } from "expo-router";
import { View, StyleSheet, Text, Button } from "react-native";

export default function signUp() {
  const router = useRouter();
  return (
    <View>
      <Text>SignUp Form</Text>
      <Button title="Go to SignIn" onPress={() => router.replace("/signIn")} />
    </View>
  );
}
