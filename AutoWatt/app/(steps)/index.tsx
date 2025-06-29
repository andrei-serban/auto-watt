import { useState, useContext } from "react";
import { useRouter } from "expo-router";
import * as Network from "expo-network";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from 'expo-image-manipulator';
import {
  View,
  Text,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputGroup from "@/components/InputGroup";
import MegaButton from "@/components/MegaButton";
import ScreenTitle from "@/components/ScreenTitle";
import ScreenButton from "@/components/ScreenButton";
import ActionButton from "@/components/ActionButton";
import { GlobalContext } from "@/context/GlobalContext";
import { Fontisto } from "@expo/vector-icons";

const API_URL = "https://just-intensely-crane.ngrok-free.app";

export default function HomeScreen() {
  const router = useRouter();
  const [submissionStep, setSubmissionStep] = useState(0);
  const {
    name,
    setName,
    notes,
    setNotes,
    address,
    setAddress,
    systemSize,
    setSystemSize,
    batteryStorage,
    setBatteryStorage,
    voltageOptimiser,
    setVoltageOptimiser,
    authorisedPerson,
    setAuthorisedPerson,
    roofAccess,
    setRoofAccess,
    cleaningPerformed,
    setCleaningPerformed,
    ramsCompleted,
    setRamsCompleted,
    date,
    setDate,
    limitations,
    setLimitations,

    weather,
    ambientTemp,
    followUpRequired,
    setFollowUpRequired,
    followUpDetails,
    setFollowUpDetails,
    technicianEmail,
    managerEmail,

    invertersTasks,
    mainsConnectionTasks,
    pvGeneratorTasks,
    electricalTestingTasks,
    performanceChecksTasks,
    visualChecksTasks,
    safetyRisksTasks,
    batterySystemsTasks,
    voltageOptimisersTasks,

    setTechnicianEmail,
    setManagerEmail,

    getPayload,
  } = useContext(GlobalContext);

  const getTaskGroupStatus = (tasks) => {
    if (tasks.filter((task) => task.value === "").length === tasks.length) {
      return -2;
    }

    if (
      tasks
        .map((task) => task.value)
        .filter((value) => ["fail", "no"].includes(value)).length > 0
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
        .filter((value) => ["pass", "yes", ""].includes(value)).length ===
      tasks.length
    ) {
      return 1;
    }

    return -3;
  };

  return (
    <ScrollView style={{ padding: 20 }}>
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
            onChange={(event, value) => {
              setDate(new Date(value));
            }}
          />
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, value) => {
              setDate(new Date(value));
            }}
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
        {/*
        <Text style={{ color: "#A9A9A9", fontWeight: 300, fontSize: 32 }}>
          (1 out of 6 completed)
        </Text>
        */}
      </View>

      <MegaButton
        title="Inverters / AC Distribution"
        onPress={() => router.push("/(steps)/inverters")}
        status={getTaskGroupStatus(invertersTasks)}
      />

      <MegaButton
        title="Mains Connection"
        onPress={() => router.push("/(steps)/mains-connection")}
        status={getTaskGroupStatus(mainsConnectionTasks)}
      />

      <MegaButton
        title="PV Generator (DC Side)"
        onPress={() => router.push("/(steps)/pv-generator")}
        status={getTaskGroupStatus(pvGeneratorTasks)}
      />

      <MegaButton
        title="Electrical Testing"
        onPress={() => router.push("/(steps)/electrical-testing")}
        status={getTaskGroupStatus(electricalTestingTasks)}
      />

      <MegaButton
        title="Performance Checks"
        onPress={() => router.push("/(steps)/performance-checks")}
        status={getTaskGroupStatus(performanceChecksTasks)}
      />

      <MegaButton
        title="Visual Inspection"
        onPress={() => router.push("/(steps)/visual-checks")}
        status={getTaskGroupStatus(visualChecksTasks)}
      />

      <MegaButton
        title="System Safety Risks"
        onPress={() => router.push("/(steps)/safety-risks")}
        status={getTaskGroupStatus(safetyRisksTasks)}
      />

      <MegaButton
        disabled={!batteryStorage}
        title="Battery Systems"
        onPress={() => {
          if (batteryStorage) {
            router.push("/(steps)/battery-storage");
          }
        }}
        status={getTaskGroupStatus(batterySystemsTasks)}
      />

      <MegaButton
        disabled={!voltageOptimiser}
        title="Voltage Optimiser"
        onPress={() => {
          if (voltageOptimiser) {
            router.push("/(steps)/voltage-optimiser");
          }
        }}
        status={getTaskGroupStatus(voltageOptimisersTasks)}
      />

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
              key={limitation.text}
              style={{ flexDirection: "row" }}
              onPress={() => {
                const newLimitations = [].concat(limitations);
                newLimitations[index].checked = !limitation.checked;
                setLimitations(newLimitations);
              }}
            >
              <View style={{ width: "10%" }}>
                {limitation.checked ? (
                  <Fontisto name="checkbox-active" size={20} color="#0a7ea4" />
                ) : (
                  <Fontisto name="checkbox-passive" size={20} />
                )}
              </View>
              <Text style={{ fontSize: 18, width: "90%" }}>
                {limitation.text}
              </Text>
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
          <ActionButton
            text="Yes"
            width={130}
            marginTop={20}
            onPress={() => setFollowUpRequired("yes")}
            selected={followUpRequired === "yes"}
          />
          <ActionButton
            text="No"
            width={130}
            marginTop={20}
            onPress={() => setFollowUpRequired("no")}
            selected={followUpRequired === "no"}
          />
        </View>
      </View>

      <InputGroup
        marginTop={0}
        numberOfLines={8}
        label={
          'Follow-up details (e.g. "Recommend scaffold and revisit to check frame condition.")'
        }
        placeholder="Note"
        value={followUpDetails}
        setValue={setFollowUpDetails}
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

      {submissionStep === 0 ? (
        <ActionButton
          onPress={async () => {
            try {
              const status = await Network.getNetworkStateAsync();

              if (status.isInternetReachable) {
                setSubmissionStep(1);

                const payload = getPayload();

                console.log('payload.pvGeneratorPhotos', payload.pvGeneratorPhotos);

                for (let i in payload.pvGeneratorPhotos) {
                  const photoId = payload.pvGeneratorPhotos[i];
                  const photoInfo = await MediaLibrary.getAssetInfoAsync(photoId);
                  const localUri = photoInfo.localUri;
                  const filename = photoId.replace(/[^a-zA-Z0-9-]/g, '_') + '.jpg';

                  const resized = await ImageManipulator.manipulateAsync(
                    localUri,
                    [{ resize: { width: 1024 } }],
                    {
                      compress: 0.8,
                      format: ImageManipulator.SaveFormat.JPEG,
                    }
                  );

                  const formData = new FormData();
                  formData.append('image', {
                    uri: resized.uri,
                    name: filename,
                    type: 'image/jpeg',
                  });

                  const response = await axios.post(`${API_URL}/upload`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });

                  console.log('Upload success:', response.data);
                }

                const submissionResponse = await axios.post(
                  API_URL,
                  payload,
                );

                setSubmissionStep(2);

                const pdfResponse = await axios.get(
                  `${API_URL}?id=${submissionResponse.data.insertId}`,
                );

                setSubmissionStep(3);

                setTimeout(() => {
                  router.push("/(steps)/report-submitted");
                }, 1000);
              } else {
                Alert.alert(
                  "The report cannot be submitted right now because your device is offline. Please try again when the device will be back online.",
                );
              }
            } catch (error) {
              console.log('Upload error:', error);
            }
          }}
          text="Generate Report"
        />
      ) : null}

      {submissionStep === 1 ? (
        <Text
          style={{
            textAlign: "center",
            padding: 20,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          ✅ Inspection submitted
        </Text>
      ) : null}

      {submissionStep === 2 ? (
        <Text
          style={{
            textAlign: "center",
            padding: 20,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          📎 PDF generating...
        </Text>
      ) : null}

      {submissionStep === 3 ? (
        <Text
          style={{
            textAlign: "center",
            padding: 20,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          📨 Sent to technician@example.com
        </Text>
      ) : null}

      {
        submissionStep
        ? <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" color="#0a7ea4" />
        </View>
        : null
      }

      <View style={{ height: 360 }}></View>
    </ScrollView>
  );
}
