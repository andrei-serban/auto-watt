import { useState, useContext } from "react";
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
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function PvGeneratorScreen() {
  const [currentInverterIndex, setCurrentInverterIndex] = useState(-1);
  const {
    inverters,
    pvGeneratorTasks,
    setPvGeneratorTasks,
    pvGeneratorPreNote,
    setPvGeneratorPreNote,
    pvGeneratorNotes,
    setPvGeneratorNotes,
    setSelectedString,
  } = useContext(GlobalContext);
  const router = useRouter();
  const screenTitle = "PV Generator (DC Side)";

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton onPress={() => router.push("/(steps)")} />

      <ScreenTitle>
        Solar Maintenance{"\n"}System Components:{"\n" + screenTitle}
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
              screen={screenTitle}
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
        <Text
          style={{
            fontSize: 24,
            fontWeight: 300,
            color: "#777",
          }}
        >
          Voc / Isc sample measurement
        </Text>

        {inverters.map((inverter, inverterIndex) => {
          const allStrings = inverter.stringObjects.length;
          const completedStrings = inverter.stringObjects.filter(
            (string) => string.status !== "",
          ).length;

          return (
            <View key={inverterIndex}>
              {inverters.length > 1 ? (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#777",
                    marginTop: 15,
                    padding: 10,
                  }}
                  onPress={() => {
                    setCurrentInverterIndex(
                      currentInverterIndex === inverterIndex
                        ? -1
                        : inverterIndex,
                    );
                  }}
                >
                  <Text
                    style={{ color: "#555", fontSize: 28, fontWeight: 300 }}
                  >
                    View Inverter {inverterIndex + 1}
                  </Text>
                  {inverter.stringObjects.filter(
                    (string) => string.status === "fail",
                  ).length ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10,
                        gap: 5,
                      }}
                    >
                      <MaterialIcons name="error" size={24} color="red" />
                      <Text
                        style={{ color: "red", fontSize: 18, fontWeight: 600 }}
                      >
                        Issue detected
                      </Text>
                    </View>
                  ) : null}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "#888",
                          fontSize: 28,
                          fontWeight: 700,
                          marginTop: 10,
                        }}
                      >
                        {completedStrings === 0
                          ? "Not started"
                          : completedStrings === allStrings
                            ? "String tests complete"
                            : "Partially Complete"}
                      </Text>
                      <Text
                        style={{ color: "#888", fontSize: 18, fontWeight: 700 }}
                      >
                        {completedStrings} of {allStrings} complete
                      </Text>
                    </View>
                    <Feather
                      name={
                        currentInverterIndex === inverterIndex
                          ? "chevron-down"
                          : "chevron-right"
                      }
                      size={28}
                      color="#2F9DFB"
                    />
                  </View>
                </TouchableOpacity>
              ) : null}

              {inverters.length === 1 ||
              currentInverterIndex === inverterIndex ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#777",
                    marginTop: 15,
                    padding: 10,
                  }}
                >
                  {inverter.stringObjects.map((stringObject, stringIndex) => {
                    return (
                      <TouchableOpacity
                        key={stringIndex}
                        style={{
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderBottomWidth: 1,
                          borderBottomColor: "#777",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onPress={() => {
                          setSelectedString(stringObject);
                          router.push({
                            pathname: "/(steps)/string-screen",
                            params: {
                              stringIndex,
                              inverterIndex,
                            },
                          });
                        }}
                      >
                        <Text
                          style={{
                            color: "#555",
                            fontSize: 28,
                            fontWeight: 300,
                          }}
                        >
                          String {stringIndex + 1}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          {stringObject.status === "fail" ? (
                            <Text
                              style={{
                                color: "#555",
                                fontSize: 28,
                                fontWeight: 300,
                                textDecorationLine: "underline",
                                color: "red",
                              }}
                            >
                              Fail
                            </Text>
                          ) : null}
                          {stringObject.status === "pass" ? (
                            <Text
                              style={{
                                color: "#555",
                                fontSize: 28,
                                fontWeight: 300,
                              }}
                            >
                              Pass
                            </Text>
                          ) : null}
                          <Feather
                            name="chevron-right"
                            size={28}
                            color="#2F9DFB"
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
          );
        })}
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
