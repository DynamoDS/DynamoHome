import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '../testUtils';
import { RecentPage } from '../../../src/components/Recent/PageRecent';

jest.mock('../../../src/components/Recent/GraphGridItem', () => ({
  GraphGridItem: ({ Caption }: any) => (
    <div data-testid="graph-grid-item">{Caption}</div>
  ),
}));

jest.mock('../../../src/components/Recent/GraphTable', () => ({
  GraphTable: ({ data, onRowClick }: any) => (
    <div data-testid="graph-table">
      {data.map((d: any) => (
        <div key={d.id} data-testid="table-row" onClick={() => onRowClick({ original: d })}>
          {d.Caption}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('../../../src/functions/utility', () => ({
  openFile: jest.fn(),
  saveHomePageSettings: jest.fn(),
}));

const defaultProps = {
  setIsDisabled: jest.fn(),
  recentPageViewMode: 'grid' as const,
};

const mockGraphs = [
  { id: '1', Caption: 'Graph One', ContextData: '/path/one.dyn', DateModified: '2024-01-01', Thumbnail: null, Description: '' },
  { id: '2', Caption: 'Graph Two', ContextData: '/path/two.dyn', DateModified: '2024-01-02', Thumbnail: null, Description: '' },
];

describe('RecentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Recent" title', () => {
    renderWithProviders(<RecentPage {...defaultProps} />);
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  it('renders grid view button', () => {
    const { container } = renderWithProviders(<RecentPage {...defaultProps} />);
    const buttons = container.querySelectorAll('button.viewmode-button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('defaults to grid mode: shows graph grid, not table', () => {
    renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="grid" />);
    expect(document.getElementById('graphContainer')).toBeTruthy();
    expect(screen.queryByTestId('graph-table')).not.toBeInTheDocument();
  });

  it('list mode shows table, not grid', () => {
    renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="list" />);
    expect(screen.getByTestId('graph-table')).toBeInTheDocument();
    expect(document.getElementById('graphContainer')).toBeNull();
  });

  it('clicking list button changes to list mode', () => {
    const { container } = renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="grid" />);
    const buttons = container.querySelectorAll('button.viewmode-button');
    // Second button is list
    fireEvent.click(buttons[1]);
    expect(screen.getByTestId('graph-table')).toBeInTheDocument();
  });

  it('clicking grid button changes to grid mode', () => {
    const { container } = renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="list" />);
    const buttons = container.querySelectorAll('button.viewmode-button');
    // First button is grid
    fireEvent.click(buttons[0]);
    expect(document.getElementById('graphContainer')).toBeTruthy();
  });

  it('grid button is disabled when viewMode is grid', () => {
    const { container } = renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="grid" />);
    const gridBtn = container.querySelectorAll('button.viewmode-button')[0];
    expect(gridBtn).toBeDisabled();
  });

  it('list button is disabled when viewMode is list', () => {
    const { container } = renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="list" />);
    const listBtn = container.querySelectorAll('button.viewmode-button')[1];
    expect(listBtn).toBeDisabled();
  });

  it('window.receiveGraphDataFromDotNet is defined after mount', () => {
    renderWithProviders(<RecentPage {...defaultProps} />);
    expect(typeof window.receiveGraphDataFromDotNet).toBe('function');
  });

  it('window.receiveGraphDataFromDotNet updates displayed graphs', async () => {
    renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="grid" />);
    act(() => {
      window.receiveGraphDataFromDotNet(mockGraphs);
    });
    expect(screen.getByText('Graph One')).toBeInTheDocument();
    expect(screen.getByText('Graph Two')).toBeInTheDocument();
  });

  it('receiveGraphDataFromDotNet with empty array does not crash', () => {
    renderWithProviders(<RecentPage {...defaultProps} />);
    expect(() => {
      act(() => {
        window.receiveGraphDataFromDotNet([]);
      });
    }).not.toThrow();
  });

  it('window.receiveGraphDataFromDotNet is removed on unmount', () => {
    const { unmount } = renderWithProviders(<RecentPage {...defaultProps} />);
    unmount();
    expect(window.receiveGraphDataFromDotNet).toBeUndefined();
  });
});
