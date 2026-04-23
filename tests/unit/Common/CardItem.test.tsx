import { render, screen, fireEvent } from '@testing-library/react';
import { CardItem } from '../../../src/components/Common/CardItem';

describe('CardItem', () => {
  const defaultProps = {
    imageSrc: 'test-image.png',
    onClick: jest.fn(),
    tooltipContent: null,
    titleText: 'Test Title',
    subtitleText: 'Test Subtitle',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the titleText', () => {
    render(<CardItem {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the subtitleText', () => {
    render(<CardItem {...defaultProps} />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders an img with the provided imageSrc', () => {
    const { container } = render(<CardItem {...defaultProps} />);
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('test-image.png');
  });

  it('calls onClick when the card link is clicked', () => {
    render(<CardItem {...defaultProps} />);
    fireEvent.click(screen.getByText('Test Title'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('renders without Tooltip when tooltipContent is null', () => {
    const { container } = render(<CardItem {...defaultProps} tooltipContent={null} />);
    expect(container.querySelector('.tooltip-wrapper')).toBeNull();
  });

  it('wraps content in Tooltip when tooltipContent is a string', () => {
    const { container } = render(<CardItem {...defaultProps} tooltipContent="Tooltip text" />);
    expect(container.querySelector('.tooltip-wrapper')).toBeTruthy();
  });

  it('wraps content in Tooltip when tooltipContent is JSX', () => {
    const { container } = render(
      <CardItem {...defaultProps} tooltipContent={<span>JSX tooltip</span>} />
    );
    expect(container.querySelector('.tooltip-wrapper')).toBeTruthy();
  });
});
