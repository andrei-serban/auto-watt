import { Tabs } from "expo-router";
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

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Start",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mains-connection"
        options={{
          title: "Mains",
          tabBarIcon: ({ color }) => (
            <Octicons size={28} name="plug" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="electrical-testing"
        options={{
          title: "Electric",
          tabBarIcon: ({ color }) => (
            <Fontisto size={28} name="lightbulb" color={color} />
          ),
        }}
      />
      <Tabs.Screen
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
      <Tabs.Screen
        name="safety-risks"
        options={{
          title: "Safety Risks",
          tabBarIcon: ({ color }) => (
            <AntDesign name="Safety" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: "Weather",
          tabBarIcon: ({ color }) => (
            <Feather name="sun" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ambient-temp"
        options={{
          title: "Ambient Temp",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="temperature-high" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fail"
        options={{
          title: "Fail",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sms-failed" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report-submitted"
        options={{
          title: "Done",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="done" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
