import { useContext } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import TaskGroup from "@/components/TaskGroup";
import InputGroup from "@/components/InputGroup";
import BackButton from "@/components/BackButton";
import ScreenTitle from "@/components/ScreenTitle";
import ActionButton from "@/components/ActionButton";
import { GlobalContext } from "@/context/GlobalContext";

export default function StringScreen() {
  const { selectedString, setSelectedString, setInverters, inverters } =
    useContext(GlobalContext);
  const router = useRouter();
  const { stringIndex, inverterIndex } = useLocalSearchParams();

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton onPress={() => router.push("/(steps)/pv-generator")} />

      <ScreenTitle>
        Solar Maintenance{"\n"}Voc / Isc sample{"\n"}measurement{"\n\n"}String{" "}
        {stringIndex * 1 + 1}
      </ScreenTitle>

      {selectedString ? (
        <>
          <Text
            style={{
              fontWeight: "600",
              marginTop: 20,
              fontSize: 30,
              color: "#777",
            }}
          >
            String
          </Text>

          <InputGroup
            label="Voc (V)"
            marginTop={10}
            value={selectedString.voc}
            setValue={(value) => {
              const newSelectedString = { ...selectedString };
              newSelectedString.voc = value;
              setSelectedString(newSelectedString);
            }}
          />

          <InputGroup
            label="Isc (A)"
            value={selectedString.isc}
            setValue={(value) => {
              const newSelectedString = { ...selectedString };
              newSelectedString.isc = value;
              setSelectedString(newSelectedString);
            }}
          />

          <InputGroup
            label="Irradiance"
            value={selectedString.irr}
            setValue={(value) => {
              const newSelectedString = { ...selectedString };
              newSelectedString.irr = value;
              setSelectedString(newSelectedString);
            }}
          />

          <Text
            style={{
              fontWeight: "600",
              marginTop: 20,
              fontSize: 30,
              color: "#777",
            }}
          >
            Array Test Insulation
          </Text>

          <InputGroup
            label="Test Voltage (V)"
            marginTop={10}
            value={selectedString.testVoltage}
            setValue={(value) => {
              const newSelectedString = { ...selectedString };
              newSelectedString.testVoltage = value;
              setSelectedString(newSelectedString);
            }}
          />

          <InputGroup
            label="Pos - Part (MΩ)"
            value={selectedString.pos}
            setValue={(value) => {
              const newSelectedString = { ...selectedString };
              newSelectedString.pos = value;
              setSelectedString(newSelectedString);
            }}
          />

          <InputGroup
            label="Neg - Part (MΩ)"
            value={selectedString.neg}
            setValue={(value) => {
              const newSelectedString = { ...selectedString };
              newSelectedString.neg = value;
              setSelectedString(newSelectedString);
            }}
          />

          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#777",
              marginTop: 25,
              padding: 10,
            }}
          >
            <TaskGroup
              label="String pass"
              value={selectedString.status}
              optionCount={2}
              yesAndNo={false}
              skipRedirect={true}
              onPress={(value) => {
                const newSelectedString = { ...selectedString };
                newSelectedString.status = value;
                setSelectedString(newSelectedString);
              }}
            />
          </View>
        </>
      ) : null}

      <ActionButton
        onPress={() => {
          const newInverters = [].concat(inverters);
          const newSelectedString = { ...selectedString };
          newInverters[inverterIndex].stringObjects[stringIndex] =
            newSelectedString;
          setInverters(newInverters);
          router.push("/(steps)/pv-generator");
        }}
        text="Submit String Check"
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
