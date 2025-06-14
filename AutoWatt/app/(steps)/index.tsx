import { useState, useContext } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputGroup from "@/components/InputGroup";
import MegaButton from "@/components/MegaButton";
import ScreenTitle from "@/components/ScreenTitle";
import ScreenButton from "@/components/ScreenButton";
import ActionButton from "@/components/ActionButton";
import { GlobalContext } from "@/context/GlobalContext";

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [systemSize, setSystemSize] = useState("");
  const [batteryStorage, setBatteryStorage] = useState(false);
  const [voltageOptimiser, setVoltageOptimiser] = useState(false);
  const [authorisedPerson, setAuthorisedPerson] = useState("");
  const [roofAccess, setRoofAccess] = useState("");
  const [cleaningPerformed, setCleaningPerformed] = useState("");
  const [ramsCompleted, setRamsCompleted] = useState("");
  const [date, setDate] = useState(new Date());
  const limitations = [
    "Could not assess roof",
    "Could only assess roof visually (e.g. from cherrypicker or drone)",
    "Structural integrity not assessed",
    "No thermography performed",
    "No electrical testing carried out",
    "Could not isolate system",
    "No comms / logging check done",
    `I confirm that the above areas were not
inspected or fall outside my competency`,
  ];

  const {
    weather,
    ambientTemp,
    technicianEmail,
    managerEmail,

    mainsConnectionTasks,
    electricalTestingTasks,

    setTechnicianEmail,
    setManagerEmail,
  } = useContext(GlobalContext);

  const getTaskGroupStatus = (tasks) => {
    if (tasks.filter((task) => task.value === "").length === tasks.length) {
      return -2;
    }

    if (
      tasks.map((task) => task.value).filter((value) => value === "fail")
        .length > 0
    ) {
      return 0;
    }

    if (
      tasks.map((task) => task.value).filter((value) => value === "n/a")
        .length > 0
    ) {
      return -1;
    }

    if (
      tasks
        .map((task) => task.value)
        .filter((value) => ["pass", ""].includes(value)).length === tasks.length
    ) {
      return 1;
    }

    return -3;
  };

  return (
    <ScrollView style={{ padding: 20, paddingTop: 120 }}>
      <ScreenTitle>Solar Maintenance</ScreenTitle>

      <InputGroup label="Name" value={name} setValue={setName} />

      <InputGroup label="Address" value={address} setValue={setAddress} />

      <InputGroup
        type="numeric"
        label="System size"
        value={systemSize}
        setValue={setSystemSize}
      />

      <InputGroup
        tag="switch"
        note="this allows for the System Components - Battery Storage page to be triggered - if it's no this should just be grey'd out"
        label="Is battery stroage installed on-site?"
        value={batteryStorage}
        setValue={setBatteryStorage}
      />

      <InputGroup
        tag="switch"
        label="Is voltage optimiser installed on-site?"
        note="this allows for the System Components - Voltage Optimiser page to be triggered - if it's no this should just be grey'd out (see battery example above for example)"
        value={voltageOptimiser}
        setValue={setVoltageOptimiser}
      />

      <InputGroup
        label="Authorised person"
        placeholder="Enter name here"
        value={authorisedPerson}
        setValue={setAuthorisedPerson}
      />

      <View
        style={{
          borderColor: "#777",
          borderWidth: 1,
          borderRadius: 10,
          padding: 8,
          marginTop: 25,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>Start</Text>
          <DateTimePicker
            value={date}
            is24Hour={true}
            display="default"
            onChange={() => {}}
          />
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={() => {}}
          />
        </View>

        <InputGroup
          tag="switch"
          marginTop={0}
          label="Roof access available"
          value={roofAccess}
          setValue={setRoofAccess}
        />

        <InputGroup
          tag="switch"
          marginTop={10}
          label="Cleaning performed"
          value={cleaningPerformed}
          setValue={setCleaningPerformed}
        />

        <InputGroup
          tag="switch"
          marginTop={10}
          label="RAMs completed"
          value={ramsCompleted}
          setValue={setRamsCompleted}
        />
      </View>

      <View
        style={{
          borderColor: "#777",
          borderWidth: 1,
          borderRadius: 10,
          padding: 8,
          marginTop: 25,
        }}
      >
        <ScreenButton
          text="Weather"
          value={weather}
          onPress={() => router.push("/(steps)/weather")}
        />
        <View
          style={{ height: 0, borderTopWidth: 1, borderTopColor: "#777" }}
        ></View>
        <ScreenButton
          text="Ambient Temp"
          value={ambientTemp}
          onPress={() => router.push("/(steps)/ambient-temp")}
        />
      </View>

      <View>
        <Text
          style={{
            color: "#A9A9A9",
            fontWeight: 700,
            marginTop: 25,
            fontSize: 32,
          }}
        >
          System components
        </Text>
        <Text style={{ color: "#A9A9A9", fontWeight: 300, fontSize: 32 }}>
          (1 out of 6 completed)
        </Text>
        <Text style={{ paddingTop: 10, fontSize: 10 }}>
          Note to self: System components The system components – each one
          brings you to a new page with the tasks associated with that component
          – I would like that if everything on the task list ‘Passes’ then the
          front page box will say Pass and same for Fail (maybe colours as well
          to make it easy – the box goes green for Pass and Red for Fail - see
          examples to the right)
        </Text>
      </View>

      <MegaButton title="Inverters / AC Distribution" status={0} />

      <MegaButton
        title="Mains Connection"
        onPress={() => router.push("/(steps)/mains-connection")}
        status={getTaskGroupStatus(mainsConnectionTasks)}
      />

      <MegaButton title="PV Generator (DC Side)" status={-1} />

      <MegaButton
        title="Electrical Testing"
        onPress={() => router.push("/(steps)/electrical-testing")}
        status={getTaskGroupStatus(electricalTestingTasks)}
      />

      <MegaButton title="Performance Checks" status={-2} />

      <MegaButton title="Visual Inspection" status={-2} />

      <MegaButton title="System Safety Risks" status={-2} />

      <MegaButton disabled={true} title="Battery Systems" status={-2} />

      <MegaButton title="Voltage Optimiser" status={-2} />

      <InputGroup
        numberOfLines={8}
        label="System Summary notes"
        placeholder="Note"
        value={notes}
        setValue={setNotes}
      />

      <View style={{ marginTop: 50 }}>
        <Text
          style={{
            color: "#A9A9A9",
            fontWeight: 700,
            fontSize: 32,
          }}
        >
          Inspection limitations
        </Text>
        <Text
          style={{
            color: "#A9A9A9",
            fontWeight: 300,
            fontSize: 32,
          }}
        >
          Declare what you could not inspect or were not qualified to assess
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#777",
            padding: 8,
            borderRadius: 10,
            marginTop: 10,
            gap: 10,
          }}
        >
          {limitations.map((limitation, index) => (
            <TouchableOpacity
              key={limitation}
              style={{ flexDirection: "row", gap: 10 }}
            >
              <Checkbox
                value={index % 2}
                onValueChange={() => {}}
                color={index % 2 ? "#0a7ea4" : undefined}
              />
              <Text>{limitation}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ marginVertical: 50 }}>
        <Text
          style={{
            color: "#A9A9A9",
            fontWeight: 700,
            fontSize: 32,
          }}
        >
          Follow-up required?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <ActionButton text="Yes" width={130} marginTop={20} />
          <ActionButton text="No" width={130} marginTop={20} />
        </View>
      </View>

      <InputGroup
        marginTop={0}
        numberOfLines={8}
        label={
          'Follow-up details (e.g. "Recommend scaffold and revisit to check frame condition.")'
        }
        placeholder="Note"
        value={notes}
        setValue={setNotes}
      />

      <View>
        <Text
          style={{
            color: "#A9A9A9",
            fontWeight: 700,
            marginTop: 25,
            fontSize: 32,
          }}
        >
          Send report to
        </Text>
      </View>

      <InputGroup
        marginTop={10}
        type="email-address"
        placeholder="Technician email"
        value={technicianEmail}
        setValue={setTechnicianEmail}
      />

      <InputGroup
        marginTop={10}
        type="email-address"
        placeholder="Managers email"
        value={managerEmail}
        setValue={setManagerEmail}
      />

      <ActionButton onPress={() => {}} text="Generate Report" />

      <Text>
        Generate report Generate report finishes the report and states the auto
        generation ‘pdf’ process bring you to the end page (15. Report
        submitted) After pressing “Generate Report”, just show: ✅ “Inspection
        submitted” 📎 PDF generating… 📨 Sent to technician@example.com This is
        reassurance and helps users trust the app.
      </Text>

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
