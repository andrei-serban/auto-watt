import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Alert } from "react-native";
import { Image } from "expo-image";
import ActionButton from "@/components/ActionButton";

export default function MediaUploader({ maxCount = 5 }) {
  const [photos, setPhotos] = useState([]);

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Camera Permission", "Camera access is required to take photos.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newPhotos = [...photos, result.assets[0].uri];
      setPhotos(newPhotos);
    }
  };

  return (
    <>
      {photos.length ? (
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {photos.map((photo) => (
            <Image
              key={photo}
              source={photo}
              style={{
                width: "33%",
                height: 100,
                aspectRatio: 1,
                borderWidth: 2,
                borderColor: "#0a7ea4",
              }}
            />
          ))}
        </View>
      ) : null}

      {photos.length < maxCount ? (
        <ActionButton
          width={180}
          marginTop={20}
          onPress={handleTakePhoto}
          text="Select Photos"
        />
      ) : null}
    </>
  );
}
