'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const themes = [
  { name: 'Pure', color: '#ffffff', bg: '#080808' },
  { name: 'Amber', color: '#ffb300', bg: '#0d0a02' },
  { name: 'Crimson', color: '#ff4d4d', bg: '#0d0202' },
  { name: 'Electric', color: '#00f2ff', bg: '#020d0d' },
  { name: 'Lime', color: '#d4ff00', bg: '#0a0d02' },
];

const ThemeContext = createContext({
  activeTheme: themes[0],
  setTheme: (name: string) => {},
  themes,
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState(themes[0]);

  const setTheme = (name: string) => {
    const theme = themes.find(t => t.name === name);
    if (theme) {
      setActiveTheme(theme);
      document.documentElement.style.setProperty('--theme-color', theme.color);
      document.documentElement.style.setProperty('--background', theme.bg);
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', activeTheme.color);
    document.documentElement.style.setProperty('--background', activeTheme.bg);
  }, []);


  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
