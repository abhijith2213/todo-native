import { Stack } from "expo-router";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}
