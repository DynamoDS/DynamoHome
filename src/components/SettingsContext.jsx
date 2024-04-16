import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const SettingsContext = createContext();

// Provider component that wraps your app components
export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({});

    // Function to update settings
    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

// Custom hook to use settings
export function useSettings() {
    return useContext(SettingsContext);
}