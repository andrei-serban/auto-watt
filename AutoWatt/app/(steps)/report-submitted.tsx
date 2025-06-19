import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import ActionButton from "@/components/ActionButton";

export default function ReportSubmittedScreen() {
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
      <View style={{ width: "100%", gap: 40 }}>
        <View style={styles.titleContainer}>
          <ThemedText
            type="subtitle"
            style={{ fontSize: 28, textAlign: "center" }}
          >
            Report submitted
            {"\n\n"}
            Thank you!
          </ThemedText>
        </View>

        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />

        <ActionButton onPress={() => router.push("/(start)")} text="HOME" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  reactLogo: {
    height: 240,
    width: "100%",
  },
});
