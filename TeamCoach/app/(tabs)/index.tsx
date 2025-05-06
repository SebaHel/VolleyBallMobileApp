import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LinksNavigations from "@/components/LinksNavigations";
import { useContext } from "react";
import { Context as AuthContext } from "@/Context/AuthContext";
import { useRouter } from "expo-router";
export default function Index() {
  const { state, signOut } = useContext(AuthContext);
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#21252C",
      }}
    >
      <View style={styles.IconContainer}>
        <LinksNavigations type="feather" iconName={"user"} size={35} />
        <LinksNavigations type="feather" iconName={"settings"} size={35} />
      </View>
      <Text>Welcome Back Name</Text>

      <TouchableOpacity onPress={() => signOut({ router })}>
        <Text>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/profile")}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 45,
    margin: 25,
  },
});
