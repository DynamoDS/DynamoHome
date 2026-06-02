import { act, render } from '@testing-library/react';
import { TemplatesProvider } from '../../src/components/TemplatesContext';

describe('TemplatesProvider', () => {
  beforeEach(() => {
    window.setShowStartPageChanged = jest.fn();
  });

  afterEach(() => {
    delete window.setShowStartPageChanged;
    delete window.receiveTemplatesDataFromDotNet;
    jest.clearAllMocks();
  });

  it('clears loading state when template data is received', () => {
    render(
      <TemplatesProvider>
        <div />
      </TemplatesProvider>
    );

    act(() => {
      window.receiveTemplatesDataFromDotNet([]);
    });

    expect(window.setShowStartPageChanged).toHaveBeenCalledWith(true);
  });
});
