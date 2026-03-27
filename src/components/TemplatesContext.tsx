import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const TemplatesContext = createContext<HomeTemplate[]>([]);

// Provider component that wraps the app components
export const TemplatesProvider = ({ children }) => {
    // Set a placeholder for the templates which will be used differently during dev and prod 
    let initialTemplates: HomeTemplate[] = [];
    
    // If we are under development, we will load the templates from the local asset folder
    if (process.env.NODE_ENV === 'development') {
        initialTemplates = require('../assets/home').templates as HomeTemplate[];
    }

    const [templates, setTemplates] = useState<HomeTemplate[]>(initialTemplates);

    // Set up the backend handler once in the provider
    useEffect(() => {
        // If we are under production, we will set up the handler for templates data from Dynamo
        if (process.env.NODE_ENV !== 'development') {
            // A method exposed to the backend used to set the templates data coming from Dynamo
            window.receiveTemplatesDataFromDotNet = (jsonData: any) => {
                try {
                    // jsonData is already an object, so no need to parse it
                    const data = (jsonData || []) as HomeTemplate[];
                    setTemplates(data);
                } catch (error) {
                    console.error('Error processing templates data:', error);
                }
            };
        }

        // Cleanup function
        return () => {
            if (process.env.NODE_ENV !== 'development') {
                delete window.receiveTemplatesDataFromDotNet;
            }
        };
    }, []);

    return (
        <TemplatesContext.Provider value={templates}>
            {children}
        </TemplatesContext.Provider>
    );
}

// Use templates hook
export function useTemplates(): HomeTemplate[] {
    return useContext(TemplatesContext);
}
