import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#6200ee" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </PaperProvider>
  );
}