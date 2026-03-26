import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '../testUtils';
import { SamplesPage } from '../../../src/components/Samples/PageSamples';

jest.mock('../../../src/components/Samples/SamplesTable', () => ({
  SamplesTable: ({ data, onRowClick }: any) => (
    <div data-testid="samples-table">
      {data.map((d: any, i: number) => (
        <div key={i} data-testid="table-row" onClick={() => onRowClick(d)}>
          {d.FileName}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('../../../src/components/Samples/SamplesGrid', () => ({
  SamplesGrid: ({ data }: any) => <div data-testid="samples-grid">SamplesGrid</div>,
}));

jest.mock('../../../src/functions/utility', () => ({
  openFile: jest.fn(),
  showSamplesCommand: jest.fn(),
  saveHomePageSettings: jest.fn(),
}));

const { openFile, showSamplesCommand } = require('../../../src/functions/utility');

const mockSamples = [
  { FileName: 'Sample One', FilePath: '/path/one.dyn', Description: '', DateModified: '2024-01-01', Thumbnail: '' },
];

describe('SamplesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Samples" title', () => {
    renderWithProviders(<SamplesPage samplesViewMode="grid" />);
    expect(screen.getByText('Samples')).toBeInTheDocument();
  });

  it('grid mode is default: shows SamplesGrid', () => {
    renderWithProviders(<SamplesPage samplesViewMode="grid" />);
    expect(screen.getByTestId('samples-grid')).toBeInTheDocument();
    expect(screen.queryByTestId('samples-table')).not.toBeInTheDocument();
  });

  it('list mode shows SamplesTable', () => {
    renderWithProviders(<SamplesPage samplesViewMode="list" />);
    expect(screen.getByTestId('samples-table')).toBeInTheDocument();
    expect(screen.queryByTestId('samples-grid')).not.toBeInTheDocument();
  });

  it('clicking List button changes to list mode', () => {
    const { container } = renderWithProviders(<SamplesPage samplesViewMode="grid" />);
    const buttons = container.querySelectorAll('button.viewmode-button');
    fireEvent.click(buttons[1]); // list button
    expect(screen.getByTestId('samples-table')).toBeInTheDocument();
  });

  it('clicking Grid button changes to grid mode', () => {
    const { container } = renderWithProviders(<SamplesPage samplesViewMode="list" />);
    const buttons = container.querySelectorAll('button.viewmode-button');
    fireEvent.click(buttons[0]); // grid button
    expect(screen.getByTestId('samples-grid')).toBeInTheDocument();
  });

  it('grid button is disabled when viewMode is grid', () => {
    const { container } = renderWithProviders(<SamplesPage samplesViewMode="grid" />);
    const gridBtn = container.querySelectorAll('button.viewmode-button')[0];
    expect(gridBtn).toBeDisabled();
  });

  it('list button is disabled when viewMode is list', () => {
    const { container } = renderWithProviders(<SamplesPage samplesViewMode="list" />);
    const listBtn = container.querySelectorAll('button.viewmode-button')[1];
    expect(listBtn).toBeDisabled();
  });

  it('window.receiveSamplesDataFromDotNet is defined after mount', () => {
    renderWithProviders(<SamplesPage samplesViewMode="grid" />);
    expect(typeof window.receiveSamplesDataFromDotNet).toBe('function');
  });

  it('window.receiveSamplesDataFromDotNet does not crash with null data', () => {
    renderWithProviders(<SamplesPage samplesViewMode="grid" />);
    expect(() => {
      act(() => {
        window.receiveSamplesDataFromDotNet(null);
      });
    }).not.toThrow();
  });

  it('window.receiveSamplesDataFromDotNet is removed on unmount', () => {
    const { unmount } = renderWithProviders(<SamplesPage samplesViewMode="grid" />);
    unmount();
    expect(window.receiveSamplesDataFromDotNet).toBeUndefined();
  });

  it('renders the "Open file location" dropdown', () => {
    renderWithProviders(<SamplesPage samplesViewMode="grid" />);
    expect(screen.getByText('Open file location')).toBeInTheDocument();
  });
});
