import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SavedProvider } from "../context/SavedContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const RootStack = () => {
  const { colors, isDark } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="trail/[id]" />
      </Stack>
    </View>
  );
};

const RootLayout = () => {
  return (
    <ThemeProvider>
      <SavedProvider>
        <RootStack />
      </SavedProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
