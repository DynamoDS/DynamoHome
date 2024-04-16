import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const SettingsContext = createContext();

// Provider component that wraps the app components
export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({});

    // Update settings
    const updateSettings = (newSettings) => {
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
