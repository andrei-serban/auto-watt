import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Stack.Screen name="index" tabBarStyle={{ display: "none" }} />
      <Stack.Screen name="inverters" />
      <Stack.Screen name="mains-connection" />
      <Stack.Screen name="pv-generator" />
      <Stack.Screen name="string-screen" />
      <Stack.Screen name="electrical-testing" />
      <Stack.Screen name="performance-checks" />
      <Stack.Screen name="visual-checks" />
      <Stack.Screen name="safety-risks" />
      <Stack.Screen name="battery-storage" />
      <Stack.Screen name="voltage-optimiser" />
      <Stack.Screen name="weather" />
      <Stack.Screen name="ambient-temp" />
      <Stack.Screen name="fail" />
      <Stack.Screen name="report-submitted" />
    </Stack>
  );
}
