// ThemeContext.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [weather, setWeather] = useState('');
  const [ambientTemp, setAmbientTemp] = useState('');

  return (
    <GlobalContext.Provider value={{ weather, setWeather, ambientTemp, setAmbientTemp }}>
      {children}
    </GlobalContext.Provider>
  );
};
