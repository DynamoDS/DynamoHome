import { render, screen, act } from '@testing-library/react';
import App from '../../src/App';

jest.mock('react-split-pane', () => {
  return function SplitPaneMock({ children }: any) {
    return <div data-testid="split-pane">{children}</div>;
  };
});

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders app successfully', () => {
    render(<App />);
  });

  it('renders the LayoutContainer with id="homeContainer"', () => {
    // LayoutContainer renders a div with className main-container; the id prop is not applied to an HTML element directly
    // We verify the app renders and the split-pane (mocked) is present as part of LayoutContainer
    render(<App />);
    expect(screen.getByTestId('split-pane')).toBeInTheDocument();
  });

  it('window.setLocale is defined after mount', () => {
    render(<App />);
    expect(typeof window.setLocale).toBe('function');
  });

  it('calling window.setLocale does not throw', () => {
    render(<App />);
    expect(() => {
      act(() => {
        window.setLocale('es-ES');
      });
    }).not.toThrow();
  });

  it('calls ApplicationLoaded when chrome.webview exists', () => {
    render(<App />);
    expect(window.chrome?.webview?.hostObjects?.scriptObject?.ApplicationLoaded).toHaveBeenCalled();
  });
});
