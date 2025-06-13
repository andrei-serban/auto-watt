// ThemeContext.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [weather, setWeather] = useState('');
  const [technicianEmail, setTechnicianEmail] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [ambientTemp, setAmbientTemp] = useState('');

  return (
    <GlobalContext.Provider value={{ 
      weather, 
      setWeather, 
      ambientTemp, 
      setAmbientTemp,
      technicianEmail, 
      setTechnicianEmail,
      managerEmail, 
      setManagerEmail
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
