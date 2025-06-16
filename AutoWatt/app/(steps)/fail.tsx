import { useState, useContext } from "react";
import { Image } from "expo-image";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import BackButton from "@/components/BackButton";
import InputGroup from "@/components/InputGroup";
import ScreenTitle from "@/components/ScreenTitle";
import ActionButton from "@/components/ActionButton";
import { GlobalContext } from "@/context/GlobalContext";
import * as ImagePicker from "expo-image-picker";

export default function FailScreen() {
  const severities = ["Critical fault", "Major fault", "Minor fault"];
  const [selectedSeverity, setSelectedSeverity] = useState(0);
  const [photos, setPhotos] = useState([]);

  const { electricalTestingNotes, setElectricalTestingNotes } =
    useContext(GlobalContext);

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton />

      <ScreenTitle subtitle="TO BE FILLED WITH ITEM">
        TO BE FILLED WITH CATEGORY - FAIL
      </ScreenTitle>

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            color: "#A9A9A9",
            fontWeight: 700,
            fontSize: 28,
            marginBottom: 10,
          }}
        >
          Select the severity of this fault before submitting
        </Text>
        <View style={{ alignItems: "center" }}>
          {severities.map((severity, index) => (
            <View
              key={severity}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: 300,
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedSeverity(index + 1)}
                style={{
                  width: "45%",
                  backgroundColor:
                    selectedSeverity === index + 1 ? "#F1F9FF" : "#0a7ea4",
                  borderColor: "#0a7ea4",
                  borderWidth: 2,
                  borderRadius: 3,
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: selectedSeverity === index + 1 ? "#0a7ea4" : "#fff",
                    fontWeight: 700,
                  }}
                >
                  Category {index + 1}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  width: "45%",
                  fontSize: 24,
                  fontWeight: 300,
                  color: "#A9A9A9",
                }}
              >
                {severity}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <InputGroup
        numberOfLines={8}
        label="is the system safe to generate?"
        placeholder="Note"
        value={electricalTestingNotes}
        setValue={setElectricalTestingNotes}
      />

      <InputGroup
        numberOfLines={8}
        label="What remedial work was done?"
        placeholder="Note"
        value={electricalTestingNotes}
        setValue={setElectricalTestingNotes}
      />

      <InputGroup
        numberOfLines={8}
        label="What needs to happen next?"
        placeholder="Note"
        value={electricalTestingNotes}
        setValue={setElectricalTestingNotes}
      />

      <View style={{ marginTop: 50 }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 300,
            textAlign: "center",
            color: "#A9A9A9",
          }}
        >
          Media upload (up to 5 photos)
        </Text>
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
        {photos.length < 5 ? (
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
      </View>

      <ActionButton onPress={() => {}} text="Save Fault Log" />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
