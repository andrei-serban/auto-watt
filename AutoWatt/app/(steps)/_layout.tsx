import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import {
  Feather,
  Fontisto,
  Octicons,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { IconSymbol } from "@/components/ui/IconSymbol";
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
      <Stack.Screen
        name="index"
        tabBarStyle={{ display: "none" }}
        options={{
          title: "Start",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="inverters"
        options={{
          title: "Inverters",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="electrical-services" color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="mains-connection"
        options={{
          title: "Mains",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="plug" color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="pv-generator"
        options={{
          title: "PV Generator",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={28} name="solar-panel" color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="electrical-testing"
        options={{
          title: "Electric",
          tabBarIcon: ({ color }) => (
            <Fontisto size={28} name="lightbulb" color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="performance-checks"
        options={{
          title: "Performance",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Stack.Screen
        name="visual-checks"
        options={{
          title: "Visual Checks",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="graphic-eq" size={28} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="safety-risks"
        options={{
          title: "Safety Risks",
          tabBarIcon: ({ color }) => (
            <AntDesign name="Safety" size={28} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="battery-storage"
        options={{
          title: "Batteries",
          tabBarIcon: ({ color }) => (
            <Feather name="battery" size={28} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="voltage-optimiser"
        options={{
          title: "VO's",
          tabBarIcon: ({ color }) => (
            <Feather name="battery" size={28} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="weather"
        options={{
          title: "Weather",
          tabBarIcon: ({ color }) => (
            <Feather name="sun" size={28} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="ambient-temp"
        options={{
          title: "Ambient Temp",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="temperature-high" size={28} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="fail"
        options={{
          title: "Fail",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sms-failed" size={28} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="report-submitted"
        options={{
          title: "Done",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="done" size={28} color={color} />
          ),
        }}
      />
    </Stack>
  );
}
