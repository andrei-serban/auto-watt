import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ActionButton from "@/components/ActionButton";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View style={{ width: "100%", gap: 40, paddingBottom: 40 }}>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle" style={{ fontSize: 28 }}>
            Welcome to AutoWatt!
          </ThemedText>
        </View>

        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />

        <ActionButton onPress={() => router.push("/(steps)")} text="START" />
      </View>

      {/*
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  reactLogo: {
    height: 240,
    width: "100%",
  },
});
