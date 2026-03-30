import { createContext, useCallback, useContext, useState } from 'react';
import { saveHomePageSettings } from '../functions/utility';

// Create the context
const SettingsContext = createContext<any>(null);

// Provider component that wraps the app components
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({});

    // Update settings without persisting.
    const updateSettings = useCallback((newSettings: any) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    }, []);

    // Merge settings and persist in a single step to avoid stale snapshots.
    const updateAndSaveSettings = useCallback((newSettings: any) => {
        setSettings(prev => {
            const nextSettings = { ...prev, ...newSettings };
            saveHomePageSettings(nextSettings);
            return nextSettings;
        });
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, updateAndSaveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

// Use settings hook
export function useSettings() {
    return useContext(SettingsContext);
}
