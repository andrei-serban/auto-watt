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

const batterySystemLabels = {
  make: "Battery make",
  model: "Battery model",
  serial: "Battery serial number",
  size: "Size of Battery (kW)",
  status: 'Battery status (e.g. "Enter battery display status or error code")',
};

export default function BatteryStorageScreen() {
  const {
    batterySystemsCount,
    setBatterySystemsCount,
    batterySystems,
    setBatterySystems,
    batterySystemsTasks,
    setBatterySystemsTasks,
    batterySystemsNotes,
    setBatterySystemsNotes,
  } = useContext(GlobalContext);
  const [activeBatterySystem, setActiveBatterySystem] = useState(-1);
  const router = useRouter();
  const screenTitle = "Battery Storage";

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton />

      <ScreenTitle>
        Solar Maintenance{"\n"}System Components:{"\n" + screenTitle}
      </ScreenTitle>

      <ScreenSummary />

      <InputGroup
        label="Number of battery systems"
        tag="picker"
        value={batterySystemsCount}
        setValue={(value) => {
          const newBatterySystems = [];
          const newValue = isNaN(value) ? 1 : value;

          for (let i = 0; i < newValue; i++) {
            newBatterySystems.push({
              make: "",
              model: "",
              serial: "",
              size: "",
              status: "",
            });
          }

          setBatterySystemsCount(newValue);
          setBatterySystems(newBatterySystems);
        }}
      />

      {batterySystems.map((batterySystem, index) => {
        const allFields = Object.values(batterySystem);
        const filledFields = allFields.filter((field) => field.trim() !== "");

        return (
          <View key={index}>
            <MegaButton
              backgroundColor="#bbb"
              title={`Battery ${index + 1}`}
              displayMessage={
                filledFields.length === allFields.length
                  ? "Battery info complete"
                  : filledFields.length > 0
                    ? "Partially complete"
                    : "Not started"
              }
              onPress={() => {
                if (activeBatterySystem === index) {
                  setActiveBatterySystem(-1);
                } else {
                  setActiveBatterySystem(index);
                }
              }}
            />
            {activeBatterySystem === index ? (
              <View>
                {Object.keys(batterySystem).map((key) => (
                  <View key={key}>
                    <InputGroup
                      label={batterySystemLabels[key]}
                      placeholder={`Enter the ${key} here`}
                      type={
                        ["size", "strings"].includes(key)
                          ? "numeric"
                          : "default"
                      }
                      value={batterySystem[key]}
                      setValue={(value) => {
                        const newBatterySystems = [].concat(batterySystems);
                        newBatterySystems[index][key] = value;
                        setBatterySystems(newBatterySystems);
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
          {batterySystemsTasks.map((task, index) => (
            <TaskGroup
              key={task.label}
              title={task.title}
              label={task.label}
              value={task.value}
              screen={screenTitle}
              onPress={(value) => {
                const newTasks = [].concat(batterySystemsTasks);
                newTasks[index].value = value;
                setBatterySystemsTasks(newTasks);
              }}
            />
          ))}
        </View>
      </View>

      <InputGroup
        numberOfLines={8}
        label="Battery Storage"
        placeholder="Note"
        value={batterySystemsNotes}
        setValue={setBatterySystemsNotes}
      />

      <ActionButton
        onPress={() => router.push("/(steps)")}
        text="Save & Return"
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
