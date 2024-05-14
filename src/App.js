import React from 'react';
import { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { getMessagesForLocale } from './localization/localization.js';
import { LayoutContainer } from './components/LayoutContainer.jsx';
import { SettingsProvider } from './components/SettingsContext.jsx';

function App() {
  const [locale, setLocale] = useState('en');

  // Function to get messages based on locale
  const messages = getMessagesForLocale(locale);

  useEffect(() => {
    window.setLocale = (newLocale) => {
      setLocale(newLocale);
    };

    // Trigger the 'ApplicationLoaded()' command on the backend
    if (chrome.webview !== undefined) {
      chrome.webview.hostObjects.scriptObject.ApplicationLoaded();
    }
  }, []);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SettingsProvider>
        <LayoutContainer id='homeContainer' />
      </SettingsProvider>
    </IntlProvider>
  );
}

export default App;
