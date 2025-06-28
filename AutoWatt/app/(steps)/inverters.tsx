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
import {
  GlobalContext,
  Inverter,
  InverterString,
} from "@/context/GlobalContext";

const inverterLabels = {
  make: "Inverter make",
  model: "Inverter model",
  serial: "Inverter serial number",
  size: "Size of inverter (kW)",
  strings: "No. of strings on inverter",
  status:
    'Inverter status (e.g. "Enter inverter display status or error code")',
};

export default function InvertersScreen() {
  const {
    invertersCount,
    setInvertersCount,
    inverters,
    setInverters,
    invertersTasks,
    setInvertersTasks,
    invertersNotes,
    setInvertersNotes,
  } = useContext(GlobalContext);
  const [activeInverter, setActiveInverter] = useState(-1);
  const router = useRouter();

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton />

      <ScreenTitle>
        Solar Maintenance{"\n"}System Components:{"\n"}Inverters / DC
        Distribution
      </ScreenTitle>

      <ScreenSummary />

      <InputGroup
        label="Number of inverters"
        tag="picker"
        value={invertersCount}
        setValue={(value) => {
          const newInverters = [];
          const newValue = isNaN(value) ? 1 : value;

          for (let i = 0; i < newValue; i++) {
            newInverters.push(new Inverter());
          }

          setInvertersCount(newValue);
          setInverters(newInverters);
        }}
      />

      {inverters.map((inverter, index) => {
        const allFields = Object.values(inverter).filter(
          (value) => typeof value === "string",
        );
        const filledFields = allFields.filter((field) => field.trim() !== "");

        return (
          <View key={index}>
            <MegaButton
              backgroundColor="#bbb"
              title={`Inverter ${index + 1}`}
              displayMessage={
                filledFields.length === allFields.length
                  ? "Inverter info complete"
                  : filledFields.length > 0
                    ? "Partially complete"
                    : "Not started"
              }
              onPress={() => {
                if (activeInverter === index) {
                  setActiveInverter(-1);
                } else {
                  setActiveInverter(index);
                }
              }}
            />
            {activeInverter === index ? (
              <View>
                {Object.keys(inverter)
                  .filter((key) => !["stringObjects"].includes(key))
                  .map((key) => (
                    <View key={key}>
                      <InputGroup
                        label={inverterLabels[key]}
                        placeholder={`Enter the ${key} here`}
                        type={
                          ["size", "strings"].includes(key)
                            ? "numeric"
                            : "default"
                        }
                        value={inverter[key]}
                        setValue={(value) => {
                          const newInverters = [].concat(inverters);
                          newInverters[index][key] = value;
                          setInverters(newInverters);
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
          {invertersTasks.map((task, index) => (
            <TaskGroup
              key={task.label}
              title={task.title}
              label={task.label}
              value={task.value}
              onPress={(value) => {
                const newTasks = [].concat(invertersTasks);
                newTasks[index].value = value;
                setInvertersTasks(newTasks);
              }}
            />
          ))}
        </View>
      </View>

      <InputGroup
        numberOfLines={8}
        label="Inverters notes"
        placeholder="Note"
        value={invertersNotes}
        setValue={setInvertersNotes}
      />

      <ActionButton
        onPress={() => {
          const newInverters = [].concat(inverters);
          newInverters.forEach((inverter, index) => {
            newInverters[index].stringObjects = [];
            const stringCount = parseInt(inverter.strings);

            for (let i = 0; i < stringCount; i++) {
              newInverters[index].stringObjects.push(new InverterString());
            }
          });
          setInverters(newInverters);
          router.push("/(steps)");
        }}
        text="Save & Return"
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
