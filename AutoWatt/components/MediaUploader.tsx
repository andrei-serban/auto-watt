import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import { View, Alert, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import ActionButton from "@/components/ActionButton";

export default function MediaUploader({ maxCount = 5 }) {
  const [photos, setPhotos] = useState([]);

  const handleTakePhoto = async () => {
    const cameraPermissionStatus = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermissionStatus.status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "Camera access is required to take photos.",
      );
      return;
    }

    const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();

    if (mediaLibraryStatus.status !== 'granted') {
      Alert.alert('Media Library Permission', 'Storage access is required to save photos.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photoUri = result.assets[0].uri;

      try {
        await MediaLibrary.createAssetAsync(photoUri);
        console.log('Photo saved to gallery');
      } catch (error) {
        console.error('Error saving photo to gallery:', error);
      }

      const newPhotos = [...photos, photoUri];
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
            <TouchableOpacity key={photo}>
              <Image
                source={photo}
                style={{
                  width: "33%",
                  height: 100,
                  aspectRatio: 1,
                  borderWidth: 2,
                  borderColor: "#0a7ea4",
                }}
              />
            </TouchableOpacity>
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
