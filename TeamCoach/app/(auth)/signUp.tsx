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
import CheckBox from "@/components/checkBox";
import { useState, useContext } from "react";
import { Context as AuthContext } from "@/Context/AuthContext";

export default function signUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { state, signup } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.topLabel}>
          <Text style={[styles.label, { marginBottom: 0 }]}>
            Let's Get Started
          </Text>
          <Text style={styles.secondaryLabel}>Fill the form</Text>
        </View>
        <Image
          source={require("../../static/volleyball.png")}
          style={styles.image}
        />
      </View>
      <View>
        <View style={styles.labelContainer}>
          <MaterialCommunityIcons name="email-outline" style={styles.icon} />
          <Text style={styles.label}>Email Address</Text>
        </View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Type your email"
          style={styles.emailInput}
          placeholderTextColor="#D8DEE970"
        />
        <View style={styles.labelContainer}>
          <AntDesign name="lock" style={styles.icon} />
          <Text style={styles.label}>Choose a Password</Text>
        </View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Type your email"
          style={styles.emailInput}
          placeholderTextColor="#D8DEE970"
          secureTextEntry
        />
        <View style={styles.labelContainer}>
          <AntDesign name="lock" style={styles.icon} />
          <Text style={styles.label}>Repeat Password</Text>
        </View>
        <TextInput
          value={repeatedPassword}
          onChangeText={setRepeatedPassword}
          placeholder="Type your email"
          style={styles.emailInput}
          placeholderTextColor="#D8DEE970"
          secureTextEntry
        />
        <CheckBox
          checked={isChecked}
          onToggle={() => setIsChecked(!isChecked)}
          label="I agree with terms of use"
        />
      </View>
      <View style={styles.buttons}>
        <AuthButton
          text={"Sign Up"}
          onPress={() => {
            signup({ email, password, repeatedPassword, isChecked, router });
          }}
        />
        <View style={styles.signUpButtonContainer}>
          <Text style={{ color: "#AEB6C3", fontSize: 18 }}>Have Account?</Text>
          <TouchableOpacity onPress={() => router.replace("/signIn")}>
            <Text style={{ color: "#D8DEE9", fontSize: 18 }}>SignIn</Text>
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
  topContainer: {
    flexDirection: "row",
    gap: 100,
    marginBottom: 62,
  },
  topLabel: {
    flexDirection: "column",
  },
  secondaryLabel: {
    marginBottom: 13,
    left: 16,
    alignSelf: "flex-start",
    color: "#AEB6C3",
    fontSize: 16,
  },

  image: {
    width: 60,
    height: 60,
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
    color: "#D8DEE990",
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
    marginTop: 15,
  },
  signUpButtonContainer: {
    marginTop: 41,
    flexDirection: "row",
    justifyContent: "center",
  },
});
