import { View, Text } from "react-native";

export default function ScreenTitle({
  children,
  subtitle = ''
}) {
  return (
    <View style={{ justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: 500, textAlign: "center" }}>
        {children}
      </Text>
      {
        subtitle
        ? <Text style={{ fontSize: 26, fontWeight: 300, textAlign: "center" }}>
          {subtitle}
        </Text>
        : null
      }
    </View>
  );
}
