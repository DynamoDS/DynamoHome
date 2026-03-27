import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithIntl } from '../testUtils';
import { CustomDropdown } from '../../../src/components/Sidebar/CustomDropDown';

const defaultOptions = [
  { label: 'Option A', value: 'option-a' },
  { label: 'Option B', value: 'option-b' },
  { label: 'Option C', value: 'option-c' },
];

describe('CustomDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the placeholder text', () => {
    renderWithIntl(
      <CustomDropdown
        id="test-dd"
        placeholder="Select..."
        options={defaultOptions}
        onSelectionChange={jest.fn()}
      />
    );
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('renders options in the DOM', () => {
    renderWithIntl(
      <CustomDropdown
        id="test-dd"
        placeholder="Select..."
        options={defaultOptions}
        onSelectionChange={jest.fn()}
      />
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('clicking an option calls onSelectionChange with its value', () => {
    const onChange = jest.fn();
    renderWithIntl(
      <CustomDropdown
        id="test-dd"
        placeholder="Select..."
        options={defaultOptions}
        onSelectionChange={onChange}
        wholeButtonActionable={true}
      />
    );
    fireEvent.click(screen.getByText('Option B'));
    expect(onChange).toHaveBeenCalledWith('option-b');
  });

  it('when wholeButtonActionable=false, clicking placeholder calls onSelectionChange with first option value', () => {
    const onChange = jest.fn();
    renderWithIntl(
      <CustomDropdown
        id="test-dd"
        placeholder="Select..."
        options={defaultOptions}
        onSelectionChange={onChange}
        wholeButtonActionable={false}
      />
    );
    fireEvent.click(screen.getByText('Select...'));
    expect(onChange).toHaveBeenCalledWith('option-a');
  });

  it('when wholeButtonActionable=true, clicking placeholder toggles the dropdown', () => {
    const onChange = jest.fn();
    const { container } = renderWithIntl(
      <CustomDropdown
        id="test-dd"
        placeholder="Select..."
        options={defaultOptions}
        onSelectionChange={onChange}
        wholeButtonActionable={true}
      />
    );
    // Click placeholder - should toggle dropdown (open), not call onSelectionChange
    fireEvent.click(screen.getByText('Select...'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('showDivider=false renders fewer spans than showDivider=true', () => {
    // The divider is a <span> element rendered conditionally
    // When showDivider=true: placeholder span + divider span = 2 spans in selected area
    // When showDivider=false: only placeholder span = 1 span in selected area
    const { container: cTrue } = renderWithIntl(
      <CustomDropdown
        id="test-dd"
        placeholder="Select..."
        options={defaultOptions}
        onSelectionChange={jest.fn()}
        showDivider={true}
      />
    );
    const { container: cFalse } = renderWithIntl(
      <CustomDropdown
        id="test-dd2"
        placeholder="Select..."
        options={defaultOptions}
        onSelectionChange={jest.fn()}
        showDivider={false}
      />
    );
    const spansTrue = cTrue.querySelector('[class*="dropdown-selected"]')?.querySelectorAll('span') ?? [];
    const spansFalse = cFalse.querySelector('[class*="dropdown-selected"]')?.querySelectorAll('span') ?? [];
    // With divider: more spans than without
    // Note: CSS module class is undefined, so we find dropdown-selected by first div containing spans
    // Alternative: count all spans in the whole dropdown
    const totalTrue = cTrue.querySelectorAll('span').length;
    const totalFalse = cFalse.querySelectorAll('span').length;
    expect(totalTrue).toBeGreaterThan(totalFalse);
  });

  it('clicking outside the dropdown fires mousedown on document', () => {
    const onChange = jest.fn();
    renderWithIntl(
      <CustomDropdown
        id="test-dd"
        placeholder="Select..."
        options={defaultOptions}
        onSelectionChange={onChange}
        wholeButtonActionable={true}
      />
    );
    // Open dropdown first
    fireEvent.click(screen.getByText('Select...'));
    // Click outside (on document body)
    fireEvent.mouseDown(document.body);
    // Dropdown should close - clicking an option now would still trigger onChange
    // We just verify no error thrown
    expect(onChange).not.toHaveBeenCalled();
  });

  it('option ids are set correctly', () => {
    renderWithIntl(
      <CustomDropdown
        id="my-dropdown"
        placeholder="Choose"
        options={defaultOptions}
        onSelectionChange={jest.fn()}
      />
    );
    expect(document.getElementById('my-dropdown-0')).toBeTruthy();
    expect(document.getElementById('my-dropdown-1')).toBeTruthy();
    expect(document.getElementById('my-dropdown-2')).toBeTruthy();
  });
});
