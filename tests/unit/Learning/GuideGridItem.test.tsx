import { render, screen, fireEvent } from '@testing-library/react';
import { startGuidedTour } from '../../../src/functions/utility';
import { GuideGridItem } from '../../../src/components/Learning/GuideGridItem';

jest.mock('../../../src/functions/utility', () => ({
  startGuidedTour: jest.fn(),
}));

const defaultProps: Guide = {
  id: 'guide-1',
  Name: 'Geometry Guide',
  Description: 'Learn geometry basics',
  Type: 'test',
  Thumbnail: '',
};

describe('GuideGridItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Name as title', () => {
    render(<GuideGridItem {...defaultProps} />);
    expect(screen.getByText('Geometry Guide')).toBeInTheDocument();
  });

  it('renders Description as subtitle and tooltip', () => {
    render(<GuideGridItem {...defaultProps} />);
    expect(screen.getByText('Learn geometry basics')).toBeInTheDocument();
  });

  it('calls startGuidedTour with Type on click', () => {
    const { container } = render(<GuideGridItem {...defaultProps} />);
    fireEvent.click(container.querySelector('a')!);
    expect(startGuidedTour).toHaveBeenCalledWith('test');
  });

  it('uses fallback image when Thumbnail is empty', () => {
    const { container } = render(<GuideGridItem {...defaultProps} Thumbnail="" />);
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toMatch(/^data:image\/png;base64,/);
  });

  it('uses Thumbnail URL when provided', () => {
    const { container } = render(
      <GuideGridItem {...defaultProps} Thumbnail="http://example.com/guide-thumb.png" />
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('http://example.com/guide-thumb.png');
  });
});
