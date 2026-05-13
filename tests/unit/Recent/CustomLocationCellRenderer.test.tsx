import { render, screen, fireEvent } from '@testing-library/react';
import { CustomLocationCellRenderer } from '../../../src/components/Recent/CustomLocationCellRenderer';

describe('CustomLocationCellRenderer', () => {
  it('renders the value (file path)', () => {
    render(<CustomLocationCellRenderer value="/some/path/file.dyn" row={{ original: { Description: '' } }} />);
    expect(screen.getByText('/some/path/file.dyn')).toBeInTheDocument();
  });

  it('wraps the value in a Tooltip', () => {
    const { container } = render(
      <CustomLocationCellRenderer value="/some/path" row={{ original: { Description: '' } }} />
    );
    expect(container.querySelector('.tooltip-wrapper')).toBeTruthy();
  });

  it('tooltip shows the path on mouseEnter', () => {
    const { container } = render(
      <CustomLocationCellRenderer value="/some/path/to/file.dyn" row={{ original: { Description: '' } }} />
    );
    const wrapper = container.querySelector('.tooltip-wrapper')!;
    fireEvent.mouseEnter(wrapper);
    // Tooltip renders content to document.body via Portal
    expect(document.body.textContent).toContain('/some/path/to/file.dyn');
  });
});
