import React, { createContext, useState } from 'react';
import { lessons } from '../pages/Vocabulaire';

export const isUserFromChina = () => {
    // Check the browser's language setting
    const language = navigator.language || navigator.userLanguage;
    if (language.includes('zh')) {
      return true;
    }
  
    // Check the user's time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const chinaTimeZones = [
      'Asia/Shanghai', // China Standard Time
      'Asia/Chongqing',
      'Asia/Harbin',
      'Asia/Kashgar',
      'Asia/Urumqi'
    ];
  
    if (chinaTimeZones.includes(timeZone)) {
      return true;
    }
  
    return false;
  };

const themeSession = () => {
    let language = window.localStorage.getItem('FRENCH_APP_LANGUAGE');
    return !!language ? (language === "true") : undefined;
}

export const getThemeSession = () => {
  let theme = window.localStorage.getItem('FRENCH_APP_THEME');
  return !!theme ? theme : 'dark';
}

// Create a Context
const ThemeContext = createContext();

// Create a provider component
const ThemeProvider = ({ children }) => {
  const [eng, setEng] = useState((themeSession() !== undefined) ? themeSession() : !isUserFromChina());
  const les = lessons;
  let [theme, setTheme] = useState(getThemeSession());

  const changeLan = () => {
    window.localStorage.setItem("FRENCH_APP_LANGUAGE", !eng)
    setEng(!eng);
  }

  themeSession();



  return (
    <ThemeContext.Provider value={{ eng, setEng, les, changeLan, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };