import { render, screen, fireEvent } from '@testing-library/react';
import { CustomNameCellRenderer } from '../../../src/components/Recent/CustomNameCellRenderer';

const makeRow = (overrides: unknown = {}) => ({
  original: {
    Thumbnail: null,
    Description: '',
    ...(overrides as Record<string, unknown>),
  },
});

describe('CustomNameCellRenderer', () => {
  it('renders the value (graph name)', () => {
    render(<CustomNameCellRenderer value="My Graph" row={makeRow()} />);
    expect(screen.getByText('My Graph')).toBeInTheDocument();
  });

  it('wraps name in Tooltip when Description exists', () => {
    const { container } = render(
      <CustomNameCellRenderer value="Graph" row={makeRow({ Description: 'A description' })} />
    );
    expect(container.querySelector('.tooltip-wrapper')).toBeTruthy();
  });

  it('does NOT wrap in Tooltip when Description is empty', () => {
    const { container } = render(
      <CustomNameCellRenderer value="Graph" row={makeRow({ Description: '' })} />
    );
    expect(container.querySelector('.tooltip-wrapper')).toBeNull();
  });

  it('uses fallback image when no Thumbnail', () => {
    const { container } = render(
      <CustomNameCellRenderer value="Graph" row={makeRow({ Thumbnail: null })} />
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toMatch(/^data:image\/png;base64,/);
  });

  it('uses Thumbnail URL when provided', () => {
    const { container } = render(
      <CustomNameCellRenderer value="Graph" row={makeRow({ Thumbnail: 'http://example.com/thumb.png' })} />
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('http://example.com/thumb.png');
  });

  it('tooltip shows description on mouseEnter', () => {
    const { container } = render(
      <CustomNameCellRenderer value="Graph" row={makeRow({ Description: 'Graph description' })} />
    );
    const wrapper = container.querySelector('.tooltip-wrapper')!;
    fireEvent.mouseEnter(wrapper);
    expect(document.body.textContent).toContain('Graph description');
  });
});
