import { useState, useEffect, useContext } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import BackButton from "@/components/BackButton";
import InputGroup from "@/components/InputGroup";
import ScreenTitle from "@/components/ScreenTitle";
import ActionButton from "@/components/ActionButton";
import MediaUploader from "@/components/MediaUploader";
import { GlobalContext } from "@/context/GlobalContext";

export default function FailScreen() {
  const severities = ["Critical fault", "Major fault", "Minor fault"];
  const { selectedTaskScreen } = useLocalSearchParams();
  const [selectedSeverity, setSelectedSeverity] = useState(0);
  const [systemSafeNote, setSystemSafeNote] = useState("");
  const [remedialWorkNote, setRemedialWorkNote] = useState("");
  const [stepsFurtherNote, setStepsFurtherNote] = useState("");
  const [photos, setPhotos] = useState([]);
  const router = useRouter();
  const {
    selectedTask,
    invertersTasks,
    setInvertersTasks,
    mainsConnectionTasks,
    setMainsConnectionTasks,
    pvGeneratorTasks,
    setPvGeneratorTasks,
    electricalTestingTasks,
    setElectricalTestingTasks,
    performanceChecksTasks,
    setPerformanceChecksTasks,
    visualChecksTasks,
    setVisualChecksTasks,
    safetyRisksTasks,
    setSafetyRisksTasks,
    batterySystemsTasks,
    setBatterySystemsTasks,
    voltageOptimisersTasks,
    setVoltageOptimisersTasks,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (selectedTask) {
      setSelectedSeverity(selectedTask.severity);
      setSystemSafeNote(selectedTask.safeNote);
      setRemedialWorkNote(selectedTask.remedialWorkNote);
      setStepsFurtherNote(selectedTask.stepsFurtherNote);
      setPhotos(selectedTask.photos);
    }
  }, [selectedTask]);

  console.log("debug", selectedTask);

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton />

      <ScreenTitle subtitle={selectedTask ? selectedTask.label : ""}>
        {selectedTaskScreen ?? ""} - FAIL
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
        value={systemSafeNote}
        setValue={setSystemSafeNote}
      />

      <InputGroup
        numberOfLines={8}
        label="What remedial work was done?"
        placeholder="Note"
        value={remedialWorkNote}
        setValue={setRemedialWorkNote}
      />

      <InputGroup
        numberOfLines={8}
        label="What needs to happen next?"
        placeholder="Note"
        value={stepsFurtherNote}
        setValue={setStepsFurtherNote}
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

        <MediaUploader
          maxCount={5}
          photos={photos}
          onUpdate={(photos) => setPhotos(photos)}
        />
      </View>

      <ActionButton
        onPress={() => {
          const newTask = {
            ...selectedTask,
            severity: selectedSeverity,
            safeNote: systemSafeNote,
            remedialWorkNote: remedialWorkNote,
            stepsFurtherNote: stepsFurtherNote,
            photos: photos,
          };

          if (newTask.category === "invertersTasks") {
            const newTasks = [].concat(invertersTasks);
            newTasks[newTask.index] = newTask;
            setInvertersTasks(newTasks);
          } else if (newTask.category === "mainsConnectionTasks") {
            const newTasks = [].concat(mainsConnectionTasks);
            newTasks[newTask.index] = newTask;
            setMainsConnectionTasks(newTasks);
          } else if (newTask.category === "pvGeneratorTasks") {
            const newTasks = [].concat(pvGeneratorTasks);
            newTasks[newTask.index] = newTask;
            setPvGeneratorTasks(newTasks);
          } else if (newTask.category === "electricalTestingTasks") {
            const newTasks = [].concat(electricalTestingTasks);
            newTasks[newTask.index] = newTask;
            setElectricalTestingTasks(newTasks);
          } else if (newTask.category === "performanceChecksTasks") {
            const newTasks = [].concat(performanceChecksTasks);
            newTasks[newTask.index] = newTask;
            setPerformanceChecksTasks(newTasks);
          } else if (newTask.category === "visualChecksTasks") {
            const newTasks = [].concat(visualChecksTasks);
            newTasks[newTask.index] = newTask;
            setVisualChecksTasks(newTasks);
          } else if (newTask.category === "safetyRisksTasks") {
            const newTasks = [].concat(safetyRisksTasks);
            newTasks[newTask.index] = newTask;
            setSafetyRisksTasks(newTasks);
          } else if (newTask.category === "batterySystemsTasks") {
            const newTasks = [].concat(batterySystemsTasks);
            newTasks[newTask.index] = newTask;
            setBatterySystemsTasks(newTasks);
          } else if (newTask.category === "voltageOptimisersTasks") {
            const newTasks = [].concat(voltageOptimisersTasks);
            newTasks[newTask.index] = newTask;
            setVoltageOptimisersTasks(newTasks);
          }

          router.back();
        }}
        text="Save Fault Log"
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
