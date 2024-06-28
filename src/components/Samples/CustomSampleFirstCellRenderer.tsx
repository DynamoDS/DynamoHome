import { CSSProperties } from 'react';
import { ClosedArrow } from '../Common/Arrow';

/**
 * Exports a custom cell renderer for the first column of the samples table view.
 * @param cell - the cell we are rendering
 */
export const CustomSampleFirstCellRenderer = ({ value, row, rows, rowIndex, collapsedRows  }: CustomSampleCellRenderer) => {
  const isChildRow = row.original.parentId !== null;
  const depth = row.original.depth || 0;
  const indent = (depth - 1) * 20; // Adjust the indent as needed
  const arrowIndent = (depth) * 20; // Adjust the indent as needed
  const isParentRow = row.original.isParent;

  const isNextRowSibling = (nextRow: Row) => {
    return nextRow.original.depth === depth && nextRow.original.parentId === row.original.parentId;
  };

  // Determine if the current row is the last child
  const isLastChild = isChildRow && !isParentRow && 
                      (rowIndex === rows.length - 1 || 
                       !isNextRowSibling(rows[rowIndex + 1]));

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
    paddingLeft: `${indent}px`
  };
  // child row
  if (isChildRow && !isParentRow) {
    const borderStyle = isLastChild ? { top: 0, bottom: 14 } : { top: 0, bottom: 0 };

    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative',  paddingLeft: `${indent}px` }}>
        <div style={{
          borderLeft: '1px dashed #ccc',
          position: 'absolute',
          left: `${indent + 3}px`,
          ...borderStyle
        }} />
        <div style={{
          borderBottom: '1px dashed #ccc',
          width: '10px',
          marginRight: '5px',
          marginLeft: '5px',
          alignSelf: 'center'
        }} />
        <div style={{ paddingLeft: '10px' }}>{value}</div>
      </div>
    );
  } 
  // nested parent row
  else if (isChildRow && isParentRow) {
    const borderStyle = { top: 0, bottom: 14 };

    return(
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative',  paddingLeft: `${indent}px` }}>
        {/* dashed lines */}
        <div style={{
          borderLeft: '1px dashed #ccc',
          position: 'absolute',
          left: `${indent + 3}px`,
          ...borderStyle
        }} />
        <div style={{
          borderBottom: '1px dashed #ccc',
          width: '10px',
          marginRight: '5px',
          marginLeft: '5px',
          alignSelf: 'center'
        }} />
        {/* arrow */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px'
          }}
          >
          <span style={{ paddingLeft: `${indent}px`, marginBottom: '6px' }}>
            <ClosedArrow isOpen={!collapsedRows[row.original.id]} />
          </span>
        </span>
        {/* cell content */}
        <div style={{ paddingLeft: `12px` }}>{value}</div>
      </div>
    );
  } 
  // parent row
  else if (isParentRow) {
    return (
      <div style={containerStyle}>
        {/* arrow */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px'
          }}
          >
          <span style={{ paddingLeft: `${indent}px` }}>
            <ClosedArrow isOpen={!collapsedRows[row.original.id]} />
          </span>
        </span>
        {/* cell content */}
        <div>{value}</div>
      </div>
    );
  } else {
    return value;
  }
};