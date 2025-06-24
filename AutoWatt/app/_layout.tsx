import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { GlobalProvider } from "../context/GlobalContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Network from "expo-network";
import { View, Text } from "react-native";
import "react-native-reanimated";

// import StepOneScreen from '../screens/StepOneScreen';

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const [isConnected, setIsConnected] = useState(null);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const checkConnection = async () => {
      const status = await Network.getNetworkStateAsync();
      setIsConnected(status.isInternetReachable);
    };

    checkConnection();

    const intervalId = setInterval(checkConnection, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GlobalProvider>
        <View style={{ paddingTop: 60 }}>
          <Text
            style={{
              textAlign: "center",
              backgroundColor: isConnected ? "green" : "red",
              color: "white",
              paddingVertical: 10,
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            {isConnected ? "Online" : "Offline"}
          </Text>
        </View>
        <Stack initialRouteName="(start)">
          <Stack.Screen name="(start)" options={{ headerShown: false }} />
          <Stack.Screen name="(steps)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GlobalProvider>
    </ThemeProvider>
  );
}
