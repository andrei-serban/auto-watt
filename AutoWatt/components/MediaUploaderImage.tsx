import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";
import ActionButton from "@/components/ActionButton";

export default function MediaUploaderImage({ id }) {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    (async () => {
      const asset = await MediaLibrary.getAssetInfoAsync(id);
      setPhoto(asset);
    })();
  }, [id]);

  if (!photo) {
    return null;
  }

  return (
    <Image
      source={photo.localUri}
      style={{
        width: "33%",
        height: 100,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: "#0a7ea4",
      }}
    />
  );
}
