import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import TaskGroup from "@/components/TaskGroup";
import MegaButton from "@/components/MegaButton";
import InputGroup from "@/components/InputGroup";
import BackButton from "@/components/BackButton";
import ScreenTitle from "@/components/ScreenTitle";
import ActionButton from "@/components/ActionButton";
import ScreenSummary from "@/components/ScreenSummary";
import { GlobalContext } from "@/context/GlobalContext";

const voltageOptimiserLabels = {
  make: "VO make",
  model: "VO model",
  serial: "VO serial number",
  size: "Size of VO (kW)",
  status: 'VO status (e.g. "Enter VO display status or error code")',
};

export default function VoltageOptimiserScreen() {
  const {
    voltageOptimisersCount,
    setVoltageOptimisersCount,
    voltageOptimisers,
    setVoltageOptimisers,
    voltageOptimisersTasks,
    setVoltageOptimisersTasks,
    voltageOptimisersNotes,
    setVoltageOptimisersNotes,
  } = useContext(GlobalContext);
  const [activeVoltageOptimiser, setActiveVoltageOptimiser] = useState(-1);
  const router = useRouter();

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton />

      <ScreenTitle>
        Solar Maintenance{"\n"}System Components:{"\n"}Voltage Optimiser (VO)
      </ScreenTitle>

      <ScreenSummary />

      <InputGroup
        label="Number of VO's"
        tag="picker"
        value={voltageOptimisersCount}
        setValue={(value) => {
          const newVoltageOptimisers = [];
          const newValue = isNaN(value) ? 1 : value;

          for (let i = 0; i < newValue; i++) {
            newVoltageOptimisers.push({
              make: "",
              model: "",
              serial: "",
              size: "",
              status: "",
            });
          }

          setVoltageOptimisersCount(newValue);
          setVoltageOptimisers(newVoltageOptimisers);
        }}
      />

      {voltageOptimisers.map((voltageOptimiser, index) => {
        const allFields = Object.values(voltageOptimiser);
        const filledFields = allFields.filter((field) => field.trim() !== "");

        return (
          <View key={index}>
            <MegaButton
              backgroundColor="#bbb"
              title={`Voltage Optimiser ${index + 1}`}
              displayMessage={
                filledFields.length === allFields.length
                  ? "VO info complete"
                  : filledFields.length > 0
                    ? "Partially complete"
                    : "Not started"
              }
              onPress={() => {
                if (activeVoltageOptimiser === index) {
                  setActiveVoltageOptimiser(-1);
                } else {
                  setActiveVoltageOptimiser(index);
                }
              }}
            />
            {activeVoltageOptimiser === index ? (
              <View>
                {Object.keys(voltageOptimiser).map((key) => (
                  <View key={key}>
                    <InputGroup
                      label={voltageOptimiserLabels[key]}
                      placeholder={`Enter the ${key} here`}
                      type={
                        ["size", "strings"].includes(key)
                          ? "numeric"
                          : "default"
                      }
                      value={voltageOptimiser[key]}
                      setValue={(value) => {
                        const newVoltageOptimisers = [].concat(voltageOptimisers);
                        newVoltageOptimisers[index][key] = value;
                        setVoltageOptimisers(newVoltageOptimisers);
                      }}
                    />
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        );
      })}

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            color: "#A9A9A9",
            fontWeight: 700,
            fontSize: 32,
            marginBottom: 10,
          }}
        >
          Tasks
        </Text>
        <View
          style={{
            borderColor: "#888",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
        >
          {voltageOptimisersTasks.map((task, index) => (
            <TaskGroup
              key={task.label}
              title={task.title}
              label={task.label}
              value={task.value}
              onPress={(value) => {
                const newTasks = [].concat(voltageOptimisersTasks);
                newTasks[index].value = value;
                setVoltageOptimisersTasks(newTasks);
              }}
            />
          ))}
        </View>
      </View>

      <InputGroup
        numberOfLines={8}
        label="Voltage Optimiser"
        placeholder="Note"
        value={voltageOptimisersNotes}
        setValue={setVoltageOptimisersNotes}
      />

      <ActionButton
        onPress={() => router.push("/(steps)")}
        text="Save & Return"
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
