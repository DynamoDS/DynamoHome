import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithIntl } from '../testUtils';
import { CustomAuthorCellRenderer } from '../../../src/components/Recent/CustomAuthorCellRenderer';

describe('CustomAuthorCellRenderer', () => {
  it('renders the author name', () => {
    renderWithIntl(<CustomAuthorCellRenderer value="John Doe" row={{ original: { Description: '' } }} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows QuestionMarkIcon when value is "Dynamo 1.x file format"', () => {
    const { container } = renderWithIntl(
      <CustomAuthorCellRenderer value="Dynamo 1.x file format" row={{ original: { Description: '' } }} />
    );
    // QuestionMarkIcon renders an SVG inside a div
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('does NOT show QuestionMarkIcon for regular author names', () => {
    const { container } = renderWithIntl(
      <CustomAuthorCellRenderer value="Alice Smith" row={{ original: { Description: '' } }} />
    );
    // Should not render QuestionMarkIcon (no tooltip-wrapper for the icon)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(0);
  });

  it('shows Tooltip with old format explanation when isOldFormat', () => {
    const { container } = renderWithIntl(
      <CustomAuthorCellRenderer value="Dynamo 1.x file format" row={{ original: { Description: '' } }} />
    );
    expect(container.querySelector('.tooltip-wrapper')).toBeTruthy();
  });

  it('does NOT show Tooltip when author is a regular name', () => {
    const { container } = renderWithIntl(
      <CustomAuthorCellRenderer value="Bob" row={{ original: { Description: '' } }} />
    );
    expect(container.querySelector('.tooltip-wrapper')).toBeNull();
  });
});
