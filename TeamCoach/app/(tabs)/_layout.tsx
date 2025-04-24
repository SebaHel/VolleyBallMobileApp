import { Tabs } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#21252C" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF8C42",
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 72,

            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: "#2E3440",
          },
          tabBarIconStyle: {
            height: 55,
            width: 55,
            margin: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "home",
            tabBarIcon: ({ color }) => (
              <Text style={styles.linkStyle}>
                <AntDesign size={45} name="home" color={color} />
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "stats",
            tabBarIcon: ({ color }) => (
              <Text style={styles.linkStyle}>
                <AntDesign size={45} name="barschart" color={color} />
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            title: "Groups",
            tabBarIcon: ({ color }) => (
              <Text style={styles.linkStyle}>
                <MaterialIcons size={45} name="groups" color={color} />
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color }) => (
              <Text style={styles.linkStyle}>
                <AntDesign size={45} name="calendar" color={color} />
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "chat",
            tabBarIcon: ({ color }) => (
              <Text style={styles.linkStyle}>
                <MaterialIcons size={45} name="chat" color={color} />
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "notification",
            tabBarIcon: ({ color }) => (
              <Text style={styles.linkStyle}>
                <MaterialIcons size={45} name="notifications" color={color} />
              </Text>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  linkStyle: {
    textShadowColor: "rgba(0, 0, 0, 0.8",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 5,
  },
});
