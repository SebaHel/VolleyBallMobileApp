import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider as AuthProvider } from "@/Context/AuthContext";
import { Provider as GroupProvider } from "@/Context/groupContext";
export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <GroupProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="inverted" />
        </GroupProvider>
      </AuthProvider>
    </>
  );
}
