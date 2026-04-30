import { createContext, useContext, useState } from 'react';

// Create the context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SettingsContext = createContext<any>(null);

// Provider component that wraps the app components
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});

  // Update settings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateSettings = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Use settings hook
export function useSettings() {
  return useContext(SettingsContext);
}
