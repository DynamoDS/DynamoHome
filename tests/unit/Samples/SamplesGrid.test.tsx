import { render, screen } from '@testing-library/react';
import { SamplesGrid } from '../../../src/components/Samples/SamplesGrid';

jest.mock('../../../src/components/Samples/SamplesGridItem', () => ({
  SamplesGridItem: (props: unknown) => {
    const { FileName } = props as { FileName: string };
    return <div data-testid="sample-grid-item">{FileName}</div>;
  },
}));

const makeLeaf = (name: string, path = '/path'): Samples => ({
  FileName: name,
  FilePath: path,
  Description: '',
  DateModified: '2024-01-01',
  Thumbnail: '',
  Children: [],
});

const makeParent = (name: string, children: Samples[]): Samples => ({
  FileName: name,
  FilePath: '',
  Description: '',
  DateModified: '',
  Thumbnail: '',
  Children: children,
});

describe('SamplesGrid', () => {
  it('renders items from root children', () => {
    const data: Samples[] = [
      makeParent('Root', [
        makeLeaf('Leaf One'),
        makeLeaf('Leaf Two'),
      ]),
    ];
    render(<SamplesGrid data={data} />);
    expect(screen.getByText('Leaf One')).toBeInTheDocument();
    expect(screen.getByText('Leaf Two')).toBeInTheDocument();
  });

  it('renders leaf node as SamplesGridItem', () => {
    const data: Samples[] = [
      makeParent('Root', [makeLeaf('Leaf Item')]),
    ];
    render(<SamplesGrid data={data} />);
    expect(screen.getAllByTestId('sample-grid-item').length).toBeGreaterThan(0);
  });

  it('renders parent node with section title and its leaf children', () => {
    const data: Samples[] = [
      makeParent('Root', [
        makeParent('Section A', [
          makeLeaf('Child One'),
          makeLeaf('Child Two'),
        ]),
      ]),
    ];
    render(<SamplesGrid data={data} />);
    expect(screen.getByText('Section A')).toBeInTheDocument();
    expect(screen.getByText('Child One')).toBeInTheDocument();
    expect(screen.getByText('Child Two')).toBeInTheDocument();
  });

  it('renders nested parent nodes recursively', () => {
    const data: Samples[] = [
      makeParent('Root', [
        makeParent('Level 1', [
          makeParent('Level 2', [
            makeLeaf('Deep Leaf'),
          ]),
        ]),
      ]),
    ];
    render(<SamplesGrid data={data} />);
    expect(screen.getByText('Level 1')).toBeInTheDocument();
    expect(screen.getByText('Level 2')).toBeInTheDocument();
    expect(screen.getByText('Deep Leaf')).toBeInTheDocument();
  });

  it('handles empty data array without crash', () => {
    expect(() => render(<SamplesGrid data={[]} />)).not.toThrow();
  });

  it('handles data[0] without Children without crash', () => {
    const data: Samples[] = [
      { FileName: 'Root', FilePath: '', Description: '', DateModified: '', Thumbnail: '' },
    ];
    expect(() => render(<SamplesGrid data={data} />)).not.toThrow();
  });

  it('renders the samplesContainer element', () => {
    render(<SamplesGrid data={[]} />);
    expect(document.getElementById('samplesContainer')).toBeTruthy();
  });
});
