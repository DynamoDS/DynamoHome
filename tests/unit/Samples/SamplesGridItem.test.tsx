import { render, screen, fireEvent } from '@testing-library/react';
import { openFile } from '../../../src/functions/utility';
import { SamplesGridItem } from '../../../src/components/Samples/SamplesGridItem';

jest.mock('../../../src/functions/utility', () => ({
  openFile: jest.fn(),
}));

const defaultProps: Samples = {
  FileName: 'Sample Graph',
  FilePath: '/path/sample.dyn',
  Description: 'A sample description',
  DateModified: '2024-03-01',
  Thumbnail: '',
};

describe('SamplesGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FileName as title', () => {
    render(<SamplesGridItem {...defaultProps} />);
    expect(screen.getByText('Sample Graph')).toBeInTheDocument();
  });

  it('renders DateModified as subtitle', () => {
    render(<SamplesGridItem {...defaultProps} />);
    expect(screen.getByText('2024-03-01')).toBeInTheDocument();
  });

  it('calls openFile with FilePath on click', () => {
    const { container } = render(<SamplesGridItem {...defaultProps} />);
    fireEvent.click(container.querySelector('a')!);
    expect(openFile).toHaveBeenCalledWith('/path/sample.dyn');
  });

  it('uses fallback image when Thumbnail is empty', () => {
    const { container } = render(<SamplesGridItem {...defaultProps} Thumbnail="" />);
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toMatch(/^data:image\/png;base64,/);
  });

  it('uses Thumbnail URL when provided', () => {
    const { container } = render(
      <SamplesGridItem {...defaultProps} Thumbnail="http://example.com/thumb.png" />
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('http://example.com/thumb.png');
  });
});
