import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackButton({ onPress }) {
  const router = useRouter();

  return (
    <View style={{ height: 60 }}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          if (onPress) {
            onPress();
          } else {
            router.back();
          }
        }}
      >
        <Feather name="chevron-left" size={28} color={"#333"} />
        <Text style={{ fontSize: 20, fontWeight: 300, color: "#333" }}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}
