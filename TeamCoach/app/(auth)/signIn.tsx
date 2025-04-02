import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { AuthButton } from "@/components/authButton";

export default function signIn() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../static/volleyball.png")}
        style={styles.image}
      />
      <View>
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons name="email-outline" style={styles.icon} />
          <Text style={styles.label}>Email Address</Text>
        </View>
        <TextInput
          placeholder="Type your email"
          style={styles.emailInput}
          placeholderTextColor="#D8DEE970"
        />
        <View style={styles.labelContainer}>
          <AntDesign name="lock" style={styles.icon} />
          <Text style={styles.label}>Password</Text>
        </View>
        <TextInput
          placeholder="Type your email"
          style={styles.emailInput}
          placeholderTextColor="#D8DEE970"
          secureTextEntry
        />
      </View>
      <View style={styles.buttons}>
        <AuthButton text={"Login"} />
        <View style={styles.signUpButtonContainer}>
          <Text style={{ color: "#AEB6C3", fontSize: 18 }}>
            Don't have Account?
          </Text>
          <TouchableOpacity onPress={() => router.replace("/signUp")}>
            <Text style={{ color: "#D8DEE9", fontSize: 18 }}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  image: {
    width: 100,
    height: 100,
    marginBottom: 74,
  },
  labelContainer: {
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  emailInput: {
    width: 372,
    height: 75,
    borderColor: "#3B4252",
    borderWidth: 1,
    borderRadius: 15,
    opacity: 80,
    marginBottom: 25,
    padding: 20,
  },
  label: {
    marginBottom: 13,
    left: 16,
    alignSelf: "flex-start",
    color: "#D8DEE9",
    fontSize: 20,
  },
  icon: {
    width: 24,
    height: 24,
    fontSize: 24,
    color: "#D8DEE9",
  },
  buttons: {
    marginTop: 55,
  },
  signUpButtonContainer: {
    marginTop: 41,
    flexDirection: "row",
    justifyContent: "center",
  },
});
