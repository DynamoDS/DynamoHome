import { render, screen, fireEvent } from '@testing-library/react';
import { openFile } from '../../../src/functions/utility';
import { GraphGridItem } from '../../../src/components/Recent/GraphGridItem';

jest.mock('../../../src/functions/utility', () => ({
  openFile: jest.fn(),
  saveHomePageSettings: jest.fn(),
}));

const defaultProps = {
  id: 'graph-1',
  Caption: 'My Graph',
  ContextData: '/path/to/graph.dyn',
  Description: 'A test graph',
  DateModified: '2024-01-15',
  Thumbnail: null,
  setIsDisabled: jest.fn(),
};

describe('GraphGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Caption as title', () => {
    render(<GraphGridItem {...defaultProps} />);
    expect(screen.getByText('My Graph')).toBeInTheDocument();
  });

  it('renders the DateModified as subtitle', () => {
    render(<GraphGridItem {...defaultProps} />);
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('calls setIsDisabled(true) and openFile on click', () => {
    const { container } = render(<GraphGridItem {...defaultProps} />);
    fireEvent.click(container.querySelector('a')!);
    expect(defaultProps.setIsDisabled).toHaveBeenCalledWith(true);
    expect(openFile).toHaveBeenCalledWith('/path/to/graph.dyn');
  });

  it('uses fallback image when no Thumbnail is provided', () => {
    const { container } = render(<GraphGridItem {...defaultProps} Thumbnail={null} />);
    const img = container.querySelector('img');
    // fallback img is a base64 PNG embedded in src/assets/home.ts
    expect(img?.getAttribute('src')).toMatch(/^data:image\/png;base64,/);
  });

  it('uses Thumbnail URL when Thumbnail is provided', () => {
    const { container } = render(<GraphGridItem {...defaultProps} Thumbnail="http://example.com/thumb.png" />);
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('http://example.com/thumb.png');
  });
});
