import { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import { getMessagesForLocale } from './localization/localization';
import { LayoutContainer } from './components/LayoutContainer';
import { SettingsProvider } from './components/SettingsContext';

const App = () => {
  const [locale, setLocale] = useState<Locale>("en");

  // Function to get messages based on locale
  const messages = getMessagesForLocale(locale);

  useEffect(() => {
    window.setLocale = (newLocale: Locale) => {
      setLocale(newLocale);
    };

    // Trigger the 'ApplicationLoaded()' command on the backend
    if (window.chrome?.webview !== undefined) {
      window.chrome.webview.hostObjects.scriptObject.ApplicationLoaded();
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
