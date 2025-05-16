import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, ThemeProvider as StyledProvider } from 'styled-components/native';

const lightTheme: DefaultTheme = {
  colors: {
    primary: '#FF7D40',
    secondary: '#4ECDC4',
    background: '#FFFFFF',
    text: '#333333',
    card: '#F5F5F5',
    border: '#E0E0E0',
    error: '#FF5252',
    success: '#4CAF50',
  },
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    // You can implement dark theme later if needed
    setTheme(lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);