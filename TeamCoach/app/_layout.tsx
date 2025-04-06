import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider as AuthProvider } from "@/Context/AuthContext";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="inverted" />
      </AuthProvider>
    </>
  );
}
