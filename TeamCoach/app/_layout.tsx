import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider as AuthProvider } from "@/Context/AuthContext";
import { Provider as GroupProvider } from "@/Context/groupContext";
import { Provider as NotificationsProvider } from "@/Context/notificationContext";
export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <GroupProvider>
          <NotificationsProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="inverted" />
          </NotificationsProvider>
        </GroupProvider>
      </AuthProvider>
    </>
  );
}
