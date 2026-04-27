import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsProvider, useSettings } from '../../src/components/SettingsContext';

const TestConsumer = ({ onRender }: { onRender?: (val: any) => void }) => {
  const ctx = useSettings();
  if (onRender) onRender(ctx);
  return (
    <div>
      <span data-testid="settings">{JSON.stringify(ctx.settings)}</span>
      <button data-testid="btn-a" onClick={() => ctx.updateSettings({ a: 'value-a' })}>Set A</button>
      <button data-testid="btn-b" onClick={() => ctx.updateSettings({ b: 'value-b' })}>Set B</button>
      <button data-testid="btn-c" onClick={() => ctx.updateSettings({ a: 'updated-a' })}>Update A</button>
    </div>
  );
};

describe('SettingsContext', () => {
  it('SettingsProvider renders its children', () => {
    render(
      <SettingsProvider>
        <div data-testid="child">child content</div>
      </SettingsProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('useSettings returns settings and updateSettings', () => {
    let captured: any;
    render(
      <SettingsProvider>
        <TestConsumer onRender={(val) => { captured = val; }} />
      </SettingsProvider>
    );
    expect(captured).toHaveProperty('settings');
    expect(captured).toHaveProperty('updateSettings');
    expect(typeof captured.updateSettings).toBe('function');
  });

  it('initial settings is an empty object', () => {
    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );
    expect(screen.getByTestId('settings')).toHaveTextContent('{}');
  });

  it('updateSettings merges new properties with existing settings', () => {
    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );
    fireEvent.click(screen.getByTestId('btn-a'));
    const parsed = JSON.parse(screen.getByTestId('settings').textContent!);
    expect(parsed.a).toBe('value-a');
  });

  it('multiple updateSettings calls accumulate settings', () => {
    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );
    fireEvent.click(screen.getByTestId('btn-a'));
    fireEvent.click(screen.getByTestId('btn-b'));
    const parsed = JSON.parse(screen.getByTestId('settings').textContent!);
    expect(parsed.a).toBe('value-a');
    expect(parsed.b).toBe('value-b');
  });

  it('updateSettings overwrites existing key when set again', () => {
    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );
    fireEvent.click(screen.getByTestId('btn-a'));
    fireEvent.click(screen.getByTestId('btn-c'));
    const parsed = JSON.parse(screen.getByTestId('settings').textContent!);
    expect(parsed.a).toBe('updated-a');
  });
});
