import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [weather, setWeather] = useState("");
  const [technicianEmail, setTechnicianEmail] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [ambientTemp, setAmbientTemp] = useState("");

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

  return (
    <GlobalContext.Provider
      value={{
        weather,
        setWeather,
        ambientTemp,
        setAmbientTemp,
        technicianEmail,
        setTechnicianEmail,
        managerEmail,
        setManagerEmail,

        mainsConnectionTasks,
        setMainsConnectionTasks,
        mainsConnectionNotes,
        setMainsConnectionNotes,

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

        safetyRisksTasks,
        setSafetyRisksTasks,
        safetyRisksNotes,
        setSafetyRisksNotes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
