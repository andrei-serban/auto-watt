import { View, TouchableOpacity, Text } from "react-native";

export default function ActionButton({
  text,
  onPress,
  width = "100%",
  marginTop = 50,
}) {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width,
          marginTop,
          padding: 15,
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#0a7ea4",
        }}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
