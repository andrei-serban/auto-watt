import { useContext } from "react";
import { View, Text } from "react-native";
import { GlobalContext } from "@/context/GlobalContext";

export default function ScreenTitle({ children }) {
  const { name, address, systemSize, authorisedPerson } =
    useContext(GlobalContext);

  return (
    <View style={{ marginTop: 40, gap: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 300, color: "#888" }}>
        Name: {name}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: 300, color: "#888" }}>
        Address: {address}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: 300, color: "#888" }}>
        System size (kW): {systemSize}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: 300, color: "#888" }}>
        Authorised Person: {authorisedPerson}
      </Text>
    </View>
  );
}
