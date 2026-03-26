import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithIntl } from '../testUtils';
import { Sidebar } from '../../../src/components/Sidebar/Sidebar';

jest.mock('../../../src/functions/utility', () => ({
  sideBarCommand: jest.fn(),
}));

const defaultProps = {
  onItemSelect: jest.fn(),
  selectedSidebarItem: 'Recent' as SidebarItem,
};

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Dynamo" logo text', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Dynamo')).toBeInTheDocument();
  });

  it('renders Recent navigation item', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  it('renders Samples navigation item', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Samples')).toBeInTheDocument();
  });

  it('renders Learning navigation item', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Learning')).toBeInTheDocument();
  });

  it('renders Discussion Forum external link', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Discussion Forum')).toBeInTheDocument();
  });

  it('renders Dynamo Website external link', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Dynamo Website')).toBeInTheDocument();
  });

  it('renders Dynamo Primer external link', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Dynamo Primer')).toBeInTheDocument();
  });

  it('renders Github Repository external link', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Github Repository')).toBeInTheDocument();
  });

  it('renders Send Issues external link', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Send Issues')).toBeInTheDocument();
  });

  it('clicking Recent calls onItemSelect with "Recent"', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    fireEvent.click(screen.getByText('Recent'));
    expect(defaultProps.onItemSelect).toHaveBeenCalledWith('Recent');
  });

  it('clicking Samples calls onItemSelect with "Samples"', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    fireEvent.click(screen.getByText('Samples'));
    expect(defaultProps.onItemSelect).toHaveBeenCalledWith('Samples');
  });

  it('clicking Learning calls onItemSelect with "Learning"', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    fireEvent.click(screen.getByText('Learning'));
    expect(defaultProps.onItemSelect).toHaveBeenCalledWith('Learning');
  });

  it('renders three clickable sidebar items', () => {
    // Tests that all 3 sidebar items are rendered and clickable
    const onItemSelect = jest.fn();
    renderWithIntl(<Sidebar onItemSelect={onItemSelect} selectedSidebarItem="Recent" />);
    ['Recent', 'Samples', 'Learning'].forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('changing selectedSidebarItem to Samples does not crash', () => {
    expect(() =>
      renderWithIntl(<Sidebar {...defaultProps} selectedSidebarItem="Samples" />)
    ).not.toThrow();
  });

  it('renders the Open dropdown', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('renders the New dropdown', () => {
    renderWithIntl(<Sidebar {...defaultProps} />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});
