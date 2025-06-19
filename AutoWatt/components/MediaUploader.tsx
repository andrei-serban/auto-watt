import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View } from "react-native";
import { Image } from "expo-image";
import ActionButton from "@/components/ActionButton";

export default function MediaUploader({ maxCount = 5 }) {
  const [photos, setPhotos] = useState([]);

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
          onPress={async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              const newPhotos = photos.concat([result.assets[0].uri]);
              setPhotos(newPhotos);
            }
          }}
          text="Select Photos"
        />
      ) : null}
    </>
  );
}
