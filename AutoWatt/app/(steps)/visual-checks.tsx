import { useContext } from "react";
import { useRouter } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import TaskGroup from "@/components/TaskGroup";
import InputGroup from "@/components/InputGroup";
import BackButton from "@/components/BackButton";
import ScreenTitle from "@/components/ScreenTitle";
import ActionButton from "@/components/ActionButton";
import ScreenSummary from "@/components/ScreenSummary";
import { GlobalContext } from "@/context/GlobalContext";

export default function VisualChecksScreen() {
  const {
    visualChecksTasks,
    setVisualChecksTasks,
    visualChecksNotes,
    setVisualChecksNotes,
  } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <ScrollView style={{ padding: 20 }}>
      <BackButton />

      <ScreenTitle>
        Solar Maintenance{"\n"}System Components:{"\n"}Visual Inspection
      </ScreenTitle>

      <ScreenSummary />

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
          {visualChecksTasks.map((task, index) => {
            return (
              <TaskGroup
                key={task.label}
                title={task.title}
                label={task.label}
                value={task.value}
                yesAndNo={task.yesAndNo}
                allowPhotos={task.allowPhotos}
                optionCount={task.optionCount}
                onPress={(value) => {
                  const newTasks = [].concat(visualChecksTasks);
                  newTasks[index].value = value;
                  setVisualChecksNotes(newTasks);
                }}
              />
            );
          })}
        </View>
      </View>

      <InputGroup
        numberOfLines={8}
        label="Visual Inspection notes"
        placeholder="Note"
        value={visualChecksNotes}
        setValue={setVisualChecksNotes}
      />

      <ActionButton
        onPress={() => router.push("/(steps)")}
        text="Save & Return"
      />

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
