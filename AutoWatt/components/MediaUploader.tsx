import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { View, Alert, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ActionButton from "@/components/ActionButton";
import MediaUploaderImage from "@/components/MediaUploaderImage";

export default function MediaUploader({ photos = [], onUpdate, maxCount = 5 }) {
  const handleTakePhoto = async () => {
    const cameraPermissionStatus =
      await ImagePicker.requestCameraPermissionsAsync();

    if (cameraPermissionStatus.status !== "granted") {
      Alert.alert(
        "Camera Permission",
        "Camera access is required to take photos.",
      );
      return;
    }

    const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();

    if (mediaLibraryStatus.status !== "granted") {
      Alert.alert(
        "Media Library Permission",
        "Storage access is required to save photos.",
      );
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
        const saveResult = await MediaLibrary.createAssetAsync(photoUri);
        const newPhotos = [...photos, saveResult.id];
        onUpdate(newPhotos);
      } catch (error) {
        console.error("Error saving photo to gallery:", error);
      }
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
            <TouchableOpacity
              key={photo}
              style={{
                position: "relative",
              }}
              onPress={() => {
                const newPhotos = photos.filter((id) => id !== photo);
                onUpdate(newPhotos);
              }}
            >
              <MediaUploaderImage id={photo} />
              <View
                style={{
                  right: 5,
                  bottom: 5,
                  width: 28,
                  height: 28,
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0a7ea4",
                }}
              >
                <FontAwesome name="trash" size={21} color="white" />
              </View>
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
