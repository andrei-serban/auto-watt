import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import ActionButton from "@/components/ActionButton";
import MediaUploader from "@/components/MediaUploader";

export default function TaskGroup({
  title,
  label,
  value,
  optionCount = 3,
  yesAndNo = false,
  allowPhotos = false,
  onPress,
}) {
  const router = useRouter();
  const options =
    optionCount === 2
      ? ["yes", "no"]
      : [yesAndNo ? "yes" : "pass", yesAndNo ? "no" : "fail", "n/a"];

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#888",
        paddingBottom: 10,
      }}
    >
      {title ? (
        <Text
          style={{
            color: "#7D7D7D",
            fontSize: 22,
            fontWeight: 700,
            color: "#888",
            marginTop: 10,
          }}
        >
          {title}
        </Text>
      ) : null}

      <Text
        style={{
          fontSize: 24,
          color: "#888",
          marginTop: title ? 0 : 10,
          marginBottom: 10,
        }}
      >
        {label}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {options.map((option) => (
          <TouchableOpacity
            onPress={() => {
              onPress(option);

              if (option === "fail") {
                router.push("/(steps)/fail");
              }
            }}
            key={option}
            style={{
              backgroundColor: option === value ? "#F1F9FF" : "#0a7ea4",
              borderColor: "#0a7ea4",
              borderWidth: 2,
              borderRadius: 3,
              width: "32%",
              padding: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: option === value ? "#0a7ea4" : "#fff",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {option.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {allowPhotos ? (
        <View>
          <Text
            style={{
              fontSize: 24,
              color: "#888",
              marginTop: 20,
            }}
          >
            Upload photos (up to 3) if{" "}
            <Text style={{ fontWeight: 700 }}>YES</Text> selected
          </Text>

          <MediaUploader maxCount={3} />
        </View>
      ) : null}
    </View>
  );
}
