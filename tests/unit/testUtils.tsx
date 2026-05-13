import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { SettingsProvider } from '../../src/components/SettingsContext';
import { getMessagesForLocale } from '../../src/localization/localization';

const enMessages = getMessagesForLocale('en');

export const renderWithIntl = (ui: ReactElement, locale: Locale = 'en') => {
  const messages = getMessagesForLocale(locale);
  return render(
    <IntlProvider locale={locale} messages={messages}>
      {ui}
    </IntlProvider>
  );
};

export const renderWithProviders = (ui: ReactElement) => {
  return render(
    <IntlProvider locale="en" messages={enMessages}>
      <SettingsProvider>
        {ui}
      </SettingsProvider>
    </IntlProvider>
  );
};
