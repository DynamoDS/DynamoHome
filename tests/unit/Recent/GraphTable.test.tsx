import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GraphTable } from '../../../src/components/Recent/GraphTable';

// Suppress the console.log(headerGroups) inside GraphTable
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
afterAll(() => {
  (console.log as jest.Mock).mockRestore();
});

const columns: Column[] = [
  { Header: 'Title', accessor: 'Caption', resizable: true },
  { Header: 'Author', accessor: 'Author', resizable: true },
  { Header: 'Date Modified', accessor: 'DateModified', resizable: true },
  { Header: 'Location', accessor: 'ContextData', resizable: true },
];

const mockData: any[] = [
  {
    id: '1',
    date: '2024-01-01',
    Caption: 'Graph One',
    Author: 'Alice',
    DateModified: '2024-01-01',
    ContextData: '/path/one.dyn',
    Thumbnail: '',
  },
  {
    id: '2',
    date: '2024-01-02',
    Caption: 'Graph Two',
    Author: 'Bob',
    DateModified: '2024-01-02',
    ContextData: '/path/two.dyn',
    Thumbnail: '',
  },
];

describe('GraphTable', () => {
  it('renders column headers', () => {
    render(<GraphTable columns={columns} data={mockData} onRowClick={jest.fn()} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Date Modified')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('renders a row for each data item', () => {
    render(<GraphTable columns={columns} data={mockData} onRowClick={jest.fn()} />);
    expect(screen.getByText('Graph One')).toBeInTheDocument();
    expect(screen.getByText('Graph Two')).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', () => {
    const onRowClick = jest.fn();
    render(<GraphTable columns={columns} data={mockData} onRowClick={onRowClick} />);
    // Click the first row
    const rows = screen.getAllByRole('row');
    // rows[0] is the header row, rows[1] is first data row
    fireEvent.click(rows[1]);
    expect(onRowClick).toHaveBeenCalled();
  });

  it('renders no data rows when data is empty', () => {
    render(<GraphTable columns={columns} data={[]} onRowClick={jest.fn()} />);
    expect(screen.queryByText('Graph One')).not.toBeInTheDocument();
    // Header row is still present
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
