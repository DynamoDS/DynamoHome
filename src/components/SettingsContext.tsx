import { createContext, useContext, useState } from 'react';

// Create the context
const SettingsContext = createContext<any>(null);

// Provider component that wraps the app components
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({});

    // Update settings
    const updateSettings = (newSettings: any) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

// Use settings hook
export function useSettings() {
    return useContext(SettingsContext);
}
