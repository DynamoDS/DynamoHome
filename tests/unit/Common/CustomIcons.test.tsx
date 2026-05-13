import { render } from '@testing-library/react';
import { GridViewIcon, ListViewIcon, QuestionMarkIcon } from '../../../src/components/Common/CustomIcons';

describe('GridViewIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<GridViewIcon />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('SVG has correct dimensions', () => {
    const { container } = render(<GridViewIcon />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('36');
    expect(svg?.getAttribute('height')).toBe('36');
  });
});

describe('ListViewIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<ListViewIcon />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('SVG has correct dimensions', () => {
    const { container } = render(<ListViewIcon />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('36');
    expect(svg?.getAttribute('height')).toBe('36');
  });
});

describe('QuestionMarkIcon', () => {
  it('renders an SVG inside a div', () => {
    const { container } = render(<QuestionMarkIcon />);
    expect(container.querySelector('div')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('SVG has correct dimensions', () => {
    const { container } = render(<QuestionMarkIcon />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('16');
    expect(svg?.getAttribute('height')).toBe('16');
  });
});
