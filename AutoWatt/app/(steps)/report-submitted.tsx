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
      <View style={{ width: "100%", paddingBottom: 40 }}>
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
          source={require("@/assets/images/auto-watt-logo.png")}
          style={styles.appLogo}
        />

        <ActionButton onPress={() => router.push("/(start)")} text="HOME" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  appLogo: {
    height: 240,
    width: "100%",
    marginTop: 30,
  },
});
