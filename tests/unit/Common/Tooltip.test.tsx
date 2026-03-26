import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Tooltip } from '../../../src/components/Common/Tooltip';

describe('Tooltip', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Tooltip content="tooltip text">
        <span>Child Element</span>
      </Tooltip>
    );
    expect(getByText('Child Element')).toBeInTheDocument();
  });

  it('tooltip content is not visible initially', () => {
    render(
      <Tooltip content="Hover me tooltip">
        <span>Hover target</span>
      </Tooltip>
    );
    expect(document.querySelector('.tooltip-box')).toBeNull();
  });

  it('shows tooltip content after mouseEnter on wrapper', () => {
    const { container } = render(
      <Tooltip content="Hover me tooltip">
        <span>Hover target</span>
      </Tooltip>
    );
    const wrapper = container.querySelector('.tooltip-wrapper')!;
    fireEvent.mouseEnter(wrapper);
    expect(document.querySelector('.tooltip-box')).toBeTruthy();
  });

  it('hides tooltip content after mouseLeave', () => {
    const { container } = render(
      <Tooltip content="Hover me tooltip">
        <span>Hover target</span>
      </Tooltip>
    );
    const wrapper = container.querySelector('.tooltip-wrapper')!;
    fireEvent.mouseEnter(wrapper);
    expect(document.querySelector('.tooltip-box')).toBeTruthy();
    fireEvent.mouseLeave(wrapper);
    expect(document.querySelector('.tooltip-box')).toBeNull();
  });

  it('renders children when no content is provided', () => {
    const { getByText } = render(
      <Tooltip>
        <span>No tooltip here</span>
      </Tooltip>
    );
    expect(getByText('No tooltip here')).toBeInTheDocument();
  });
});
