import { useContext } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import TaskGroup from "@/components/TaskGroup";
import InputGroup from "@/components/InputGroup";
import BackButton from "@/components/BackButton";
import ScreenTitle from "@/components/ScreenTitle";
import ActionButton from "@/components/ActionButton";
import MediaUploader from "@/components/MediaUploader";
import { GlobalContext } from "@/context/GlobalContext";
import { Feather } from "@expo/vector-icons";

export default function StringScreen() {
  const {
    pvGeneratorPreNote,
    setPvGeneratorPreNote,
    pvGeneratorNotes,
    setPvGeneratorNotes,
  } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton onPress={() => router.push("/(steps)/pv-generator")} />

      <ScreenTitle>
        Solar Maintenance{"\n"}Voc / Isc sample{"\n"}measurement{"\n\n"}String 1
      </ScreenTitle>

      <InputGroup
        label="Voc (V)"
        value={pvGeneratorPreNote}
        setValue={setPvGeneratorPreNote}
      />

      <InputGroup
        label="Isc (A)"
        value={pvGeneratorNotes}
        setValue={setPvGeneratorNotes}
      />

      <InputGroup
        label="Insulation Resistance (MOhms)"
        value={pvGeneratorNotes}
        setValue={setPvGeneratorNotes}
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
	        value="fail"
	        optionCount={2}
	        yesAndNo={false}
	        onPress={(value) => {
	          const newTasks = [].concat(batterySystemsTasks);
	          newTasks[index].value = value;
	          setBatterySystemsTasks(newTasks);
	        }}
	      />
      </View>

      <ActionButton
        onPress={() => router.push("/(steps)/pv-generator")}
        text="Submit String Check"
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
