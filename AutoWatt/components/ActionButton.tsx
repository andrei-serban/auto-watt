import { View, TouchableOpacity, Text } from "react-native";

export default function ActionButton({
  text,
  onPress,
  width = "100%",
  marginTop = 50,
  selected = false
}) {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width,
          marginTop,
          padding: 5,
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#0a7ea4",
        }}
        onPress={onPress}
      >
        <Text
          style={{
            padding: 10,
            width: '100%',
            fontSize: 16,
            borderRadius: 3,
            color: selected ? '#0a7ea4' : "white",
            backgroundColor: selected ? 'white' : 'transparent',
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
