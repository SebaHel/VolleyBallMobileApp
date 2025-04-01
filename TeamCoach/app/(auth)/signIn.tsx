import { View, Button, Text } from "react-native";
import { useRouter } from "expo-router";

export default function signIn() {
  const router = useRouter();
  return (
    <View>
      <Text>Sign In Form</Text>
      <Button title="Go to SignUp" onPress={() => router.replace("/signUp")} />
    </View>
  );
}
