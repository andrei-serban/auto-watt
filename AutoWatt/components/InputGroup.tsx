import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";

export default function InputGroup({
  note,
  type,
  label,
  value,
  setValue,
  placeholder,
  tag = "input",
  numberOfLines = 1,
  marginTop = undefined,
}) {
  const [isExpanded, setIsExpanded] = useState(0);

  return (
    <View
      style={{
        borderColor: "#777",
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        marginTop: marginTop ?? 25,
      }}
    >
      {label ? (
        <Text style={{ marginBottom: 5, fontSize: 20, fontWeight: 300 }}>
          {label}
        </Text>
      ) : null}

      {tag === "picker" ? (
        <View>
          {isExpanded ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "space-evenly",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
                <View key={option} style={{ width: "19%" }}>
                  <TouchableOpacity
                    style={{ borderWidth: 1, borderRadius: 5 }}
                    onPress={() => {
                      setIsExpanded(false);
                      setValue(option);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        padding: 10,
                        textAlign: "center",
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={{ fontSize: 24 }}>{value}</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}

      {tag === "input" ? (
        <TextInput
          autoCapitalize={(type || "").includes("email") ? "none" : "sentences"}
          multiline={numberOfLines > 1}
          numberOfLines={numberOfLines}
          style={{
            fontSize: 24,
            height: numberOfLines > 1 ? numberOfLines * 30 : "auto",
          }}
          placeholder={
            placeholder || `Enter the ${(label || "").toLowerCase()} here`
          }
          value={value}
          onChangeText={setValue}
          keyboardType={type || "default"}
        />
      ) : null}

      {tag === "switch" ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: 24 }}>No</Text>
          <Switch
            trackColor={{ true: "#0a7ea4" }}
            onValueChange={setValue}
            value={value}
          />
          <Text style={{ fontSize: 24 }}>Yes</Text>
        </View>
      ) : null}

      {note ? (
        <Text style={{ paddingTop: 10, fontSize: 10 }}>
          Note to self: {note}
        </Text>
      ) : null}
    </View>
  );
}
