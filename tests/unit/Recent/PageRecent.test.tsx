import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithProviders } from '../testUtils';
import { RecentPage } from '../../../src/components/Recent/PageRecent';
import { useTemplates } from '../../../src/components/TemplatesContext';
import { openFile } from '../../../src/functions/utility';

jest.mock('../../../src/components/Recent/GraphGridItem', () => ({
  GraphGridItem: (props: unknown) => {
    const { Caption } = props as { Caption: string };
    return <div data-testid="graph-grid-item">{Caption}</div>;
  },
}));

jest.mock('../../../src/components/Recent/GraphTable', () => ({
  GraphTable: (props: unknown) => {
    const { data, onRowClick } = props as {
      data: Array<{ id: string; Caption: string; ContextData: string }>;
      onRowClick: (row: { original: { id: string; Caption: string; ContextData: string } }) => void;
    };
    return (
      <div data-testid="graph-table">
        {data.map((d) => (
          <div key={d.id} data-testid="table-row" onClick={() => onRowClick({ original: d })}>
            {d.Caption}
          </div>
        ))}
      </div>
    );
  },
}));

jest.mock('../../../src/functions/utility', () => ({
  openFile: jest.fn(),
  saveHomePageSettings: jest.fn(),
}));

jest.mock('../../../src/components/TemplatesContext', () => ({
  useTemplates: jest.fn(),
}));

const defaultProps = {
  setIsDisabled: jest.fn(),
  recentPageViewMode: 'grid' as const,
};

const mockGraphs = [
  { id: '1', Caption: 'Graph One', ContextData: '/path/one.dyn', DateModified: '2024-01-01', Thumbnail: null, Description: '' },
  { id: '2', Caption: 'Graph Two', ContextData: '/path/two.dyn', DateModified: '2024-01-02', Thumbnail: null, Description: '' },
];

const mockTemplates = [
  {
    id: 'template-1',
    Caption: 'Template One',
    ContextData: '/path/template-one.dyn',
    DateModified: '2024-02-01',
    Thumbnail: '',
    Author: '',
    Description: '',
  },
];

const mockUseTemplates = useTemplates as jest.MockedFunction<typeof useTemplates>;

describe('RecentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTemplates.mockReturnValue([]);
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

  it('window.receiveGraphDataFromDotNet clears loading state', () => {
    renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="grid" />);
    act(() => {
      window.receiveGraphDataFromDotNet(mockGraphs);
    });
    expect(defaultProps.setIsDisabled).toHaveBeenCalledWith(false);
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

  it('renders templates returned by TemplatesContext', () => {
    mockUseTemplates.mockReturnValue(mockTemplates);
    renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="grid" />);

    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('Template One')).toBeInTheDocument();
  });

  it('switches templates to list view', () => {
    mockUseTemplates.mockReturnValue(mockTemplates);
    renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="grid" />);

    fireEvent.click(screen.getByTestId('templates-view-toggle-list'));

    expect(screen.getByTestId('graph-table')).toBeInTheDocument();
    expect(screen.getByText('Template One')).toBeInTheDocument();
  });

  it('opens a template from the templates table', () => {
    mockUseTemplates.mockReturnValue(mockTemplates);
    renderWithProviders(<RecentPage {...defaultProps} recentPageViewMode="grid" />);

    fireEvent.click(screen.getByTestId('templates-view-toggle-list'));
    fireEvent.click(screen.getByText('Template One'));

    expect(defaultProps.setIsDisabled).toHaveBeenCalledWith(true);
    expect(openFile).toHaveBeenCalledWith('/path/template-one.dyn');
  });
});
