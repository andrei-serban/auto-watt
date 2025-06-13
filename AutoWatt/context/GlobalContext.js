import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [weather, setWeather] = useState('');
  const [technicianEmail, setTechnicianEmail] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [ambientTemp, setAmbientTemp] = useState('');

  const [mainsConnectionTasks, setMainsConnectionTasks] = useState([
    {
      title: 'Labeling & Signage',
      label: 'Warning / hazard signs present',
      value: ''
    },
    {
      label: 'Labels correct and visible',
      value: ''
    },
    {
      title: 'Physical safety',
      label: 'Entrance barriers assessed (if applicable)',
      value: ''
    },
    {
      label: 'Mains connection tightness / no burns',
      value: ''
    },
    {
      label: 'Breaker operates mechanically',
      value: ''
    },
    {
      title: 'Electical Integrity',
      label: 'Protection device rating correct',
      value: ''
    }
  ]);
  const [mainsConnectionNotes, setMainsConnectionNotes] = useState('');

  const [electricalTestingTasks, setElectricalTestingTasks] = useState([
    {
      label: 'Voc within acceptable range',
      value: ''
    },
    {
      label: 'Isc measuring safely',
      value: ''
    },
    {
      label: 'Isulation resistance within limit',
      value: ''
    },
    {
      label: 'Earth continuity tested',
      value: ''
    },
    {
      label: 'Inverter functional test',
      value: ''
    },
    {
      label: 'RCD trip tested (if installed)',
      value: ''
    }
  ]);
  const [electricalTestingNotes, setElectricalTestingNotes] = useState('');

  return (
    <GlobalContext.Provider value={{ 
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
      setElectricalTestingNotes
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
