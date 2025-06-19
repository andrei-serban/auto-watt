import { useContext } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import TaskGroup from "@/components/TaskGroup";
import InputGroup from "@/components/InputGroup";
import BackButton from "@/components/BackButton";
import ScreenTitle from "@/components/ScreenTitle";
import ActionButton from "@/components/ActionButton";
import ScreenSummary from "@/components/ScreenSummary";
import MediaUploader from "@/components/MediaUploader";
import { GlobalContext } from "@/context/GlobalContext";
import { Feather } from "@expo/vector-icons";

export default function PvGeneratorScreen() {
  const {
    pvGeneratorTasks,
    setPvGeneratorTasks,
    pvGeneratorPreNote,
    setPvGeneratorPreNote,
    pvGeneratorNotes,
    setPvGeneratorNotes,
  } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton />

      <ScreenTitle>
        Solar Maintenance{"\n"}System Components:{"\n"}PV Generator (DC Side)
      </ScreenTitle>

      <ScreenSummary />

      <InputGroup
        numberOfLines={8}
        label="Modules soiling / shading"
        placeholder="Note"
        value={pvGeneratorPreNote}
        setValue={setPvGeneratorPreNote}
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

        <MediaUploader maxCount={5} />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            color: "#A9A9A9",
            fontWeight: 700,
            fontSize: 28,
            marginBottom: 10,
          }}
        >
          PV Generator (DC Side)
        </Text>
        <View
          style={{
            borderColor: "#888",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
        >
          {pvGeneratorTasks.map((task, index) => (
            <TaskGroup
              key={task.label}
              title={task.title}
              label={task.label}
              value={task.value}
              onPress={(value) => {
                const newTasks = [].concat(pvGeneratorTasks);
                newTasks[index].value = value;
                setPvGeneratorTasks(newTasks);
              }}
            />
          ))}
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
      	<Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 300, color: '#777' }}>Voc / Isc sample measurement</Text>

				<View style={{ borderWidth: 1, borderRadius: 10, borderColor: '#777', padding: 10 }}>
      		{[1,2,3,4,5,6].map(string => <TouchableOpacity key={string} style={{ paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#777', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      			<Text style={{ color: '#555', fontSize: 28, fontWeight: 300 }}>String {string}</Text>
      			<Feather name="chevron-right" size={28} color="#2F9DFB" />
      		</TouchableOpacity>)}
    		</View>
    	</View>

      <InputGroup
        numberOfLines={8}
        label="PV Generator (DC Side) notes"
        placeholder="Note"
        value={pvGeneratorNotes}
        setValue={setPvGeneratorNotes}
      />

      <ActionButton
        onPress={() => router.push("/(steps)")}
        text="Save & Return"
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
