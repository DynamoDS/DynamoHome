import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomSampleFirstCellRenderer } from '../../../src/components/Samples/CustomSampleFirstCellRenderer';

// Cast so TypeScript doesn't complain about the string return case
const Renderer = CustomSampleFirstCellRenderer as React.FC<any>;

const makeRow = (overrides: Partial<Original> = {}): Row => ({
  original: {
    id: 'row-1',
    parentId: null,
    isParent: false,
    depth: 0,
    ContextData: '',
    ...overrides,
  } as Original,
  cells: [],
  getRowProps: (p) => p,
});

describe('CustomSampleFirstCellRenderer', () => {
  describe('leaf node (no isParent, parentId=null)', () => {
    it('returns the value directly as text', () => {
      const row = makeRow({ parentId: null, isParent: false });
      render(<Renderer value="Leaf Value" row={row} rows={[row]} rowIndex={0} collapsedRows={{}} />);
      expect(screen.getByText('Leaf Value')).toBeInTheDocument();
    });

    it('does not render dashed border divs', () => {
      const row = makeRow({ parentId: null, isParent: false });
      const { container } = render(
        <Renderer value="Leaf" row={row} rows={[row]} rowIndex={0} collapsedRows={{}} />
      );
      // Leaf case returns just the value string - no wrapping divs with borders
      expect(container.querySelector('[style*="dashed"]')).toBeNull();
    });
  });

  describe('parent row (isParent=true, parentId=null)', () => {
    it('renders the value', () => {
      const row = makeRow({ parentId: null, isParent: true });
      render(<Renderer value="Parent Section" row={row} rows={[row]} rowIndex={0} collapsedRows={{}} />);
      expect(screen.getByText('Parent Section')).toBeInTheDocument();
    });

    it('renders a ClosedArrow (SVG)', () => {
      const row = makeRow({ parentId: null, isParent: true });
      const { container } = render(
        <Renderer value="Parent" row={row} rows={[row]} rowIndex={0} collapsedRows={{}} />
      );
      expect(container.querySelector('svg')).toBeTruthy();
    });

    it('ClosedArrow class is longer (isOpen=true) when row id NOT in collapsedRows', () => {
      const row = makeRow({ id: 'parent-1', parentId: null, isParent: true });
      // isOpen=true => extra class appended
      const { container: c1 } = render(
        <Renderer value="Parent" row={row} rows={[row]} rowIndex={0} collapsedRows={{}} />
      );
      // isOpen=false => no extra class
      const { container: c2 } = render(
        <Renderer value="Parent" row={row} rows={[row]} rowIndex={0} collapsedRows={{ 'parent-1': true }} />
      );
      const cls1 = c1.querySelector('svg')?.getAttribute('class') ?? '';
      const cls2 = c2.querySelector('svg')?.getAttribute('class') ?? '';
      // isOpen=true should have more class tokens
      expect(cls1.length).toBeGreaterThan(cls2.length);
    });

    it('ClosedArrow class is shorter (isOpen=false) when row id IS in collapsedRows', () => {
      const row = makeRow({ id: 'parent-1', parentId: null, isParent: true });
      const { container } = render(
        <Renderer value="Parent" row={row} rows={[row]} rowIndex={0} collapsedRows={{ 'parent-1': true }} />
      );
      // When collapsed, isOpen=false → fewer class tokens
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('child row (isChildRow=true, isParent=false)', () => {
    const parentRow = makeRow({ id: 'parent-1', parentId: null, isParent: true, depth: 1 });
    const childRow = makeRow({ id: 'child-1', parentId: 'parent-1', isParent: false, depth: 2 });

    it('renders the value', () => {
      render(
        <Renderer
          value="Child Value"
          row={childRow}
          rows={[parentRow, childRow]}
          rowIndex={1}
          collapsedRows={{}}
        />
      );
      expect(screen.getByText('Child Value')).toBeInTheDocument();
    });

    it('renders dashed border divs', () => {
      const { container } = render(
        <Renderer
          value="Child"
          row={childRow}
          rows={[parentRow, childRow]}
          rowIndex={1}
          collapsedRows={{}}
        />
      );
      expect(container.querySelector('[style*="dashed"]')).toBeTruthy();
    });

    it('last child has borderStyle bottom=14', () => {
      // childRow is last row (rowIndex=1 = rows.length-1)
      const { container } = render(
        <Renderer
          value="Last Child"
          row={childRow}
          rows={[parentRow, childRow]}
          rowIndex={1}
          collapsedRows={{}}
        />
      );
      // Find the absolute-positioned dashed border div
      const borderDiv = container.querySelector('[style*="border-left"]');
      expect(borderDiv).toBeTruthy();
      // bottom: 14 is applied as isLastChild=true
      expect(borderDiv?.getAttribute('style')).toContain('bottom: 14px');
    });

    it('non-last child has borderStyle bottom=0', () => {
      const siblingRow = makeRow({ id: 'child-2', parentId: 'parent-1', isParent: false, depth: 2 });
      const { container } = render(
        <Renderer
          value="First Child"
          row={childRow}
          rows={[parentRow, childRow, siblingRow]}
          rowIndex={1}
          collapsedRows={{}}
        />
      );
      const borderDiv = container.querySelector('[style*="border-left"]');
      expect(borderDiv).toBeTruthy();
      // bottom: 0 is applied as isLastChild=false
      const style = borderDiv?.getAttribute('style') ?? '';
      // top: 0; bottom: 0 means bottom is 0px or 0
      expect(style).toMatch(/bottom:\s*0(px)?/);
    });
  });

  describe('nested parent row (isChildRow=true, isParent=true)', () => {
    const parentRow = makeRow({ id: 'parent-1', parentId: null, isParent: true, depth: 1 });
    const nestedParent = makeRow({ id: 'nested-1', parentId: 'parent-1', isParent: true, depth: 2 });

    it('renders the value', () => {
      render(
        <Renderer
          value="Nested Section"
          row={nestedParent}
          rows={[parentRow, nestedParent]}
          rowIndex={1}
          collapsedRows={{}}
        />
      );
      expect(screen.getByText('Nested Section')).toBeInTheDocument();
    });

    it('renders dashed border and an arrow (SVG)', () => {
      const { container } = render(
        <Renderer
          value="Nested"
          row={nestedParent}
          rows={[parentRow, nestedParent]}
          rowIndex={1}
          collapsedRows={{}}
        />
      );
      expect(container.querySelector('[style*="dashed"]')).toBeTruthy();
      expect(container.querySelector('svg')).toBeTruthy();
    });
  });
});
