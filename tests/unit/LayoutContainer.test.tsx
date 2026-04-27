import { render, screen, fireEvent, act } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { SettingsProvider } from '../../src/components/SettingsContext';
import { LayoutContainer } from '../../src/components/LayoutContainer';
import { getMessagesForLocale } from '../../src/localization/localization';
import { saveHomePageSettings } from '../../src/functions/utility';

jest.mock('react-split-pane', () => {
  return function SplitPaneMock({ children, onDragFinished }: any) {
    return (
      <div data-testid="split-pane">
        <button data-testid="trigger-resize" onClick={() => onDragFinished && onDragFinished(350)}>
          Resize
        </button>
        {children}
      </div>
    );
  };
});

jest.mock('../../src/components/Sidebar/Sidebar', () => ({
  Sidebar: ({ selectedSidebarItem }: any) => (
    <div data-testid="sidebar">Sidebar - {selectedSidebarItem}</div>
  ),
}));

jest.mock('../../src/components/MainContent', () => ({
  MainContent: ({ isDisabled, selectedSidebarItem }: any) => (
    <div data-testid="main-content" data-disabled={String(isDisabled)}>
      MainContent - {selectedSidebarItem}
    </div>
  ),
}));

jest.mock('../../src/functions/utility', () => ({
  saveHomePageSettings: jest.fn(),
}));

const messages = getMessagesForLocale('en');

const renderLayout = () =>
  render(
    <IntlProvider locale="en" messages={messages}>
      <SettingsProvider>
        <LayoutContainer />
      </SettingsProvider>
    </IntlProvider>
  );

describe('LayoutContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crash', () => {
    expect(() => renderLayout()).not.toThrow();
  });

  it('renders the Sidebar', () => {
    renderLayout();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders the MainContent', () => {
    renderLayout();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('window.setShowStartPageChanged is defined after mount', () => {
    renderLayout();
    expect(typeof window.setShowStartPageChanged).toBe('function');
  });

  it('window.setHomePageSettings is defined after mount', () => {
    renderLayout();
    expect(typeof window.setHomePageSettings).toBe('function');
  });

  it('calling setShowStartPageChanged(false) sets isDisabled=true', () => {
    renderLayout();
    act(() => {
      window.setShowStartPageChanged!(false);
    });
    expect(screen.getByTestId('main-content').getAttribute('data-disabled')).toBe('true');
  });

  it('calling setShowStartPageChanged(true) sets isDisabled=false', () => {
    renderLayout();
    act(() => {
      window.setShowStartPageChanged!(false);
    });
    act(() => {
      window.setShowStartPageChanged!(true);
    });
    expect(screen.getByTestId('main-content').getAttribute('data-disabled')).toBe('false');
  });

  it('calling setHomePageSettings with valid JSON does not throw', () => {
    renderLayout();
    expect(() => {
      act(() => {
        window.setHomePageSettings!('{"recentPageViewMode":"list"}');
      });
    }).not.toThrow();
  });

  it('calling setHomePageSettings with invalid JSON does not throw', () => {
    renderLayout();
    expect(() => {
      act(() => {
        window.setHomePageSettings!('{invalid-json');
      });
    }).not.toThrow();
  });

  it('calling setHomePageSettings with empty string does not throw', () => {
    renderLayout();
    expect(() => {
      act(() => {
        window.setHomePageSettings!('');
      });
    }).not.toThrow();
  });

  it('removes window globals on unmount', () => {
    const { unmount } = renderLayout();
    unmount();
    expect(window.setShowStartPageChanged).toBeUndefined();
    expect(window.setHomePageSettings).toBeUndefined();
  });

  it('triggering resize calls saveHomePageSettings', async () => {
    renderLayout();
    await act(async () => {
      fireEvent.click(screen.getByTestId('trigger-resize'));
    });
    expect(saveHomePageSettings).toHaveBeenCalled();
  });
});
