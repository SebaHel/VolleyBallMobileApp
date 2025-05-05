import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider as AuthProvider } from "@/Context/AuthContext";
import { Provider as GroupProvider } from "@/Context/groupContext";
import { Provider as NotificationProvider } from "@/Context/notificationContext";
import { Provider as ProfileProvider } from "@/Context/profileContext";
export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <GroupProvider>
          <NotificationProvider>
            <ProfileProvider>
              <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="inverted" />
            </ProfileProvider>
          </NotificationProvider>
        </GroupProvider>
      </AuthProvider>
    </>
  );
}
