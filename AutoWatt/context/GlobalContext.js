import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Inverter {
  make = "";
  model = "";
  serial = "";
  size = "";
  strings = "1";
  stringObjects = [new InverterString()];
  status = "";
}

export class InverterString {
  voc = "";
  isc = "";
  irr = "";
  testVoltage = "";
  pos = "";
  neg = "";
  status = "";
}

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
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

  const [limitations, setLimitations] = useState([
    {
      text: "Could not assess roof",
      checked: false,
    },
    {
      text: "Could only assess roof visually (e.g. from cherrypicker or drone)",
      checked: false,
    },
    {
      text: "Structural integrity not assessed",
      checked: false,
    },
    {
      text: "No thermography performed",
      checked: false,
    },
    {
      text: "No electrical testing carried out",
      checked: false,
    },
    {
      text: "Could not isolate system",
      checked: false,
    },
    {
      text: "No comms / logging check done",
      checked: false,
    },
    {
      text: "I confirm that the above areas were not inspected or fall outside my competency",
      checked: false,
    },
  ]);

  const [followUpRequired, setFollowUpRequired] = useState('');
  const [followUpDetails, setFollowUpDetails] = useState(false);
  const [weather, setWeather] = useState("");
  const [technicianEmail, setTechnicianEmail] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [ambientTemp, setAmbientTemp] = useState("");

  const [invertersCount, setInvertersCount] = useState("1");
  const [inverters, setInverters] = useState([new Inverter()]);
  const [invertersTasks, setInvertersTasks] = useState([
    {
      label: 'Inverters operating in "normal" mode',
      value: "",
    },
    {
      label: "No signs of overheat, noise, vibration",
      value: "",
    },
    {
      label: "Warning / hazard signs functional",
      value: "",
    },
    {
      label: "Door locks, humidity, internal condition checked",
      value: "",
    },
    {
      label: "Dust filters checked, replaced if needed",
      value: "",
    },
    {
      label: "Heat exchangers cleaned",
      value: "",
    },
    {
      label: "Labels readable and correctly placed",
      value: "",
    },
    {
      label: "Grounding system visually inspected",
      value: "",
    },
    {
      label: "Fuses / breakers / disconnections condition",
      value: "",
    },
    {
      label: "Fan functionality and noise assessed",
      value: "",
    },
    {
      label: "Cable condition, connection tightness",
      value: "",
    },
    {
      label: "Supply voltage within spec",
      value: "",
    },
    {
      label: "Surge protection working (if applicable)",
      value: "",
    },
    {
      label: "Ground insulation protection (if applicable)",
      value: "",
    },
    {
      label: "Comms cabling, HUBs, loggers working",
      value: "",
    },
    {
      label: "Maintenance aligns with inverted and O&M manual",
      value: "",
    },
  ]);
  const [invertersNotes, setInvertersNotes] = useState("");

  const [pvGeneratorPreNote, setPvGeneratorPreNote] = useState("");
  const [pvGeneratorTasks, setPvGeneratorTasks] = useState([
    {
      label: "PV frame screw options (5% sample)",
      value: "",
    },
    {
      label: "Frame construction stability (5% sample)",
      value: "",
    },
    {
      label: "Module fixing to frame (5% sample)",
      value: "",
    },
    {
      label: "DC connectors test (5% sample)",
      value: "",
    },
    {
      label: "Solar cable condition / fixing (5% sample)",
      value: "",
    },
    {
      label: "Grounding connections cleaned & checked",
      value: "",
    },
    {
      label: "Modules mechanically intact, no discolouration",
      value: "",
    },
    {
      label: "Thermography of modules / connections (5%)",
      value: "",
    },
    {
      label: "Further 5% test if fault detected",
      value: "",
    },
  ]);
  const [pvGeneratorNotes, setPvGeneratorNotes] = useState("");

  const [mainsConnectionTasks, setMainsConnectionTasks] = useState([
    {
      title: "Labeling & Signage",
      label: "Warning / hazard signs present",
      value: "",
    },
    {
      label: "Labels correct and visible",
      value: "",
    },
    {
      title: "Physical safety",
      label: "Entrance barriers assessed (if applicable)",
      value: "",
    },
    {
      label: "Mains connection tightness / no burns",
      value: "",
    },
    {
      label: "Breaker operates mechanically",
      value: "",
    },
    {
      title: "Electical Integrity",
      label: "Protection device rating correct",
      value: "",
    },
  ]);
  const [mainsConnectionNotes, setMainsConnectionNotes] = useState("");

  const [electricalTestingTasks, setElectricalTestingTasks] = useState([
    {
      label: "Voc within acceptable range",
      value: "",
    },
    {
      label: "Isc measuring safely",
      value: "",
    },
    {
      label: "Isulation resistance within limit",
      value: "",
    },
    {
      label: "Earth continuity tested",
      value: "",
    },
    {
      label: "Inverter functional test",
      value: "",
    },
    {
      label: "RCD trip tested (if installed)",
      value: "",
    },
  ]);
  const [electricalTestingNotes, setElectricalTestingNotes] = useState("");

  const [performanceChecksExportValue, setPerformanceChecksExportValue] =
    useState("");
  const [performanceChecksTasks, setPerformanceChecksTasks] = useState([
    {
      label: "Generation meter reading logged",
      value: "",
      optionCount: 2,
    },
    {
      label: "Output vs expected (adjusted)",
      value: "",
      optionCount: 2,
    },
    {
      label: "Inverter logs reviewed",
      value: "",
      optionCount: 2,
    },
    {
      label: "Monitor and comms working",
      value: "",
    },
  ]);
  const [performanceChecksNotes, setPerformanceChecksNotes] = useState("");

  const [visualChecksTasks, setVisualChecksTasks] = useState([
    {
      label: "PV modules visually sound (no damage, soiling)",
      value: "",
    },
    {
      label: "Mounting system secure, corrosion-free",
      value: "",
    },
    {
      label: "Cables intact, fixes, UV-resistant",
      value: "",
    },
    {
      label: "Signage & labels present, legible",
      value: "",
    },
    {
      label:
        "Signs of birds nesting, droppings or wildlife interference \n\n(may impact performance or safety)?",
      value: "",
      optionCount: 2,
      allowPhotos: true,
    },
    {
      label:
        "Debris, leaves or obstruction under panels (may impact performance or safety)?",
      value: "",
      optionCount: 2,
      allowPhotos: true,
    },
  ]);
  const [visualChecksNotes, setVisualChecksNotes] = useState("");

  const [safetyRisksTasks, setSafetyRisksTasks] = useState([
    {
      label: "Are MC4 connectors secure, matched and undamaged? (5% sample)",
      value: "",
    },
    {
      label: "Are DC cables elevated and free from mechanical abrasion?",
      value: "",
    },
    {
      label: "Any signs of electrical arcing, scorching or melted insulation?",
      value: "",
    },
    {
      label: "Were thermal images taken for this system?",
      value: "",
      optionCount: 2,
      allowPhotos: true,
    },
    {
      label: "Any hotspots identified (e.g. connectors, junction boxes)?",
      value: "",
      yesAndNo: true,
    },
    {
      label:
        "Cleaning method checked - no signs of damage from high pressure washing or aggressive brushing?",
      value: "",
      yesAndNo: true,
    },
  ]);
  const [safetyRisksNotes, setSafetyRisksNotes] = useState("");

  const [batterySystemsCount, setBatterySystemsCount] = useState("1");
  const [batterySystems, setBatterySystems] = useState([
    {
      make: "",
      model: "",
      serial: "",
      size: "",
      status: "",
    },
  ]);
  const [batterySystemsTasks, setBatterySystemsTasks] = useState([
    {
      label:
        "Battery location safe and compliant (e.g. ventilated, non-combustible surface)",
      value: "",
    },
    {
      label: "Signs of overheating, restricted airflow, or obstruction",
      value: "",
    },
  ]);
  const [batterySystemsNotes, setBatterySystemsNotes] = useState("");

  const [voltageOptimisersCount, setVoltageOptimisersCount] = useState("1");
  const [voltageOptimisers, setVoltageOptimisers] = useState([
    {
      make: "",
      model: "",
      serial: "",
      size: "",
      status: "",
    },
  ]);
  const [voltageOptimisersTasks, setVoltageOptimisersTasks] = useState([
    {
      label:
        "VO location safe and compliant (e.g. ventilated, non-combustible surface)",
      value: "",
    },
    {
      label: "Signs of overheating, restricted airflow, or obstruction",
      value: "",
    },
  ]);
  const [voltageOptimisersNotes, setVoltageOptimisersNotes] = useState("");

  const [selectedString, setSelectedString] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskScreen, setSelectedTaskScreen] = useState('');

  const getPayload = () => {
    return {
      name,
      notes,
      address,
      systemSize,
      batteryStorage,
      voltageOptimiser,
      authorisedPerson,
      roofAccess,
      cleaningPerformed,
      ramsCompleted,
      date,
      limitations,
      followUpRequired,
      followUpDetails,
      weather,
      ambientTemp,
      technicianEmail,
      managerEmail,
      invertersCount,
      inverters,
      invertersTasks,
      invertersNotes,
      mainsConnectionTasks,
      mainsConnectionNotes,
      pvGeneratorPreNote,
      pvGeneratorTasks,
      pvGeneratorNotes,
      electricalTestingTasks,
      electricalTestingNotes,
      performanceChecksTasks,
      performanceChecksExportValue,
      performanceChecksNotes,
      visualChecksTasks,
      visualChecksNotes,
      safetyRisksTasks,
      safetyRisksNotes,
      batterySystemsCount,
      batterySystems,
      batterySystemsTasks,
      batterySystemsNotes,
      voltageOptimisersCount,
      voltageOptimisers,
      voltageOptimisersTasks,
      voltageOptimisersNotes,
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let latestReport = await AsyncStorage.getItem('latestReport');

        if (latestReport) {
          latestReport = JSON.parse(latestReport);

          setName(latestReport.name || '');
          setAddress(latestReport.address || '');

          if (latestReport.mainsConnectionTasks) {
            setMainsConnectionTasks(latestReport.mainsConnectionTasks);
          }
        }
      } catch (e) {
        console.error('Failed to load latest report:', e);
      }
    })();
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('latestReport', JSON.stringify(getPayload()));
  }, [
    name,
    notes,
    address,
    systemSize,
    batteryStorage,
    voltageOptimiser,
    authorisedPerson,
    roofAccess,
    cleaningPerformed,
    ramsCompleted,
    date,
    limitations,
    followUpRequired,
    followUpDetails,
    weather,
    ambientTemp,
    technicianEmail,
    managerEmail,
    invertersCount,
    inverters,
    invertersTasks,
    invertersNotes,
    mainsConnectionTasks,
    mainsConnectionNotes,
    pvGeneratorPreNote,
    pvGeneratorTasks,
    pvGeneratorNotes,
    electricalTestingTasks,
    electricalTestingNotes,
    performanceChecksTasks,
    performanceChecksExportValue,
    performanceChecksNotes,
    visualChecksTasks,
    visualChecksNotes,
    safetyRisksTasks,
    safetyRisksNotes,
    batterySystemsCount,
    batterySystems,
    batterySystemsTasks,
    batterySystemsNotes,
    voltageOptimisersCount,
    voltageOptimisers,
    voltageOptimisersTasks,
    voltageOptimisersNotes
  ]);

  return (
    <GlobalContext.Provider
      value={{
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

        followUpRequired,
        setFollowUpRequired,
        followUpDetails,
        setFollowUpDetails,

        weather,
        setWeather,
        ambientTemp,
        setAmbientTemp,
        technicianEmail,
        setTechnicianEmail,
        managerEmail,
        setManagerEmail,

        invertersCount,
        setInvertersCount,
        inverters,
        setInverters,
        invertersTasks,
        setInvertersTasks,
        invertersNotes,
        setInvertersNotes,

        mainsConnectionTasks,
        setMainsConnectionTasks,
        mainsConnectionNotes,
        setMainsConnectionNotes,

        pvGeneratorPreNote,
        setPvGeneratorPreNote,
        pvGeneratorTasks,
        setPvGeneratorTasks,
        pvGeneratorNotes,
        setPvGeneratorNotes,

        electricalTestingTasks,
        setElectricalTestingTasks,
        electricalTestingNotes,
        setElectricalTestingNotes,

        performanceChecksTasks,
        setPerformanceChecksTasks,
        performanceChecksExportValue,
        setPerformanceChecksExportValue,
        performanceChecksNotes,
        setPerformanceChecksNotes,

        visualChecksTasks,
        setVisualChecksTasks,
        visualChecksNotes,
        setVisualChecksNotes,

        safetyRisksTasks,
        setSafetyRisksTasks,
        safetyRisksNotes,
        setSafetyRisksNotes,

        batterySystemsCount,
        setBatterySystemsCount,
        batterySystems,
        setBatterySystems,
        batterySystemsTasks,
        setBatterySystemsTasks,
        batterySystemsNotes,
        setBatterySystemsNotes,

        voltageOptimisersCount,
        setVoltageOptimisersCount,
        voltageOptimisers,
        setVoltageOptimisers,
        voltageOptimisersTasks,
        setVoltageOptimisersTasks,
        voltageOptimisersNotes,
        setVoltageOptimisersNotes,

        getPayload,

        selectedString,
        setSelectedString,

        selectedTask,
        setSelectedTask,
        selectedTaskScreen,
        setSelectedTaskScreen
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
