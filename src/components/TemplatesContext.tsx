import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type TemplateInput = Omit<Graph, 'DateModified'> & {
  date?: string;
  Author?: string;
  DateModified?: string;
  Description?: string;
};

type Template = Graph & {
  Author: string;
  Description: string;
};

const normalizeTemplate = (template: TemplateInput): Template => {
  const { date, DateModified, Author, Description, ...templateData } = template;

  return {
    ...templateData,
    DateModified: DateModified || date || '',
    Author: Author || '',
    Description: Description || '',
  };
};

// Create the context
const TemplatesContext = createContext<Template[]>([]);

type TemplatesProviderProps = {
  children: ReactNode;
};

// Provider component that wraps the app components
export const TemplatesProvider = ({ children }: TemplatesProviderProps) => {
  // Set a placeholder for the templates which will be used differently during dev and prod
  let initialTemplates: Template[] = [];

  // If we are under development, we will load the templates from the local asset folder
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    initialTemplates = require('../assets/home').templates.map(normalizeTemplate);
  }

  const [templates, setTemplates] = useState(initialTemplates);

  // Set up the backend handler once in the provider
  useEffect(() => {
    // If we are under production, we will set up the handler for templates data from Dynamo
    if (process.env.NODE_ENV !== 'development') {
      // A method exposed to the backend used to set the templates data coming from Dynamo
      window.receiveTemplatesDataFromDotNet = (jsonData: TemplateInput[] | null) => {
        try {
          // jsonData is already an object, so no need to parse it
          const data = (jsonData || []).map(normalizeTemplate);
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
};

// Use templates hook
export function useTemplates() {
  return useContext(TemplatesContext);
}
